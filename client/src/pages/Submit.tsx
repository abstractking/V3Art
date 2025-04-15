import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useWeb3 } from '@/hooks/use-web3';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2, CheckCircle, LinkIcon, Shield } from 'lucide-react';

// Define the schema for the submission form
const nftSubmissionSchema = z.object({
  worldOfVLink: z.string().url({ message: "Please enter a valid World of V URL" }),
  walletAddress: z.string().min(1, { message: "VeChain wallet address is required" }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type NFTSubmissionForm = z.infer<typeof nftSubmissionSchema>;

const Submit: FC = () => {
  const { walletAddress, isConnected, connect } = useWeb3();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NFTSubmissionForm>({
    resolver: zodResolver(nftSubmissionSchema),
    defaultValues: {
      worldOfVLink: '',
      walletAddress: walletAddress || '',
      terms: false,
    },
  });

  // Update wallet address in form when user connects
  useEffect(() => {
    if (walletAddress) {
      form.setValue('walletAddress', walletAddress);
    }
  }, [walletAddress, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NFTSubmissionForm) => {
      return await apiRequest('POST', '/api/submit', data);
    },
    onSuccess: () => {
      toast({
        title: "Verification Request Submitted",
        description: "Your World of V art has been submitted for verification.",
      });
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Verification Failed",
        description: error.message || "There was an error verifying your World of V art.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NFTSubmissionForm) => {
    mutate(data);
  };

  // Handle wallet connect
  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to VeChain wallet",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="max-w-2xl mx-auto bg-card shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Submission Received!</CardTitle>
            <CardDescription className="text-center">
              Thank you for submitting your NFT to VeCollab
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-muted-foreground">
              Your World of V NFT submission has been received and is now pending verification by our team.
              We'll verify your ownership and connect it to your VeChain wallet address.
            </p>
            <div className="border rounded-lg p-4 bg-secondary/30 mb-6">
              <p className="font-medium">Next Steps:</p>
              <ol className="text-left list-decimal pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Our verification team will review your submission</li>
                <li>If verified, your NFT will be displayed in our gallery</li>
                <li>You'll receive a notification when your NFT is live</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href = '/'} className="button-primary">
              Return to Gallery
            </Button>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="submission-section">
      <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
        <div className="md:flex">
          <div className="md:w-1/2 bg-primary p-8 text-white flex items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Verify Your World of V Art</h2>
              <p className="text-white/90 mb-6">
                As a collector, verify your World of V marketplace art purchases to showcase them in our gallery.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Verified ownership through VeChain blockchain validation</span>
                </li>
                <li className="flex items-start">
                  <LinkIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Direct linking to your World of V art collections</span>
                </li>
              </ul>
              <p className="text-sm text-white/70">*All art purchases are verified manually by our curation team</p>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="worldOfVLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>World of V NFT Link</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://worldofv.art/nft/..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the full URL to your NFT from World of V marketplace
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VeChain Wallet Address or VET Domain</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="Your VeChain wallet address or VET domain"
                            {...field}
                            disabled={isConnected}
                          />
                        </FormControl>
                        {!isConnected && (
                          <Button 
                            type="button" 
                            variant="secondary" 
                            onClick={handleConnectWallet}
                            className="whitespace-nowrap"
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                      <FormDescription>
                        Connect your VeChain wallet or enter your address/domain manually
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I confirm I am the owner of this NFT and I agree to the 
                          <a href="#" className="text-primary hover:text-primary/90 ml-1">
                            Terms and Conditions
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full button-primary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify My Art'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Submit;
