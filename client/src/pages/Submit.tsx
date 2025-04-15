import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { artworkSubmissionFormSchema, ArtworkSubmissionForm } from '@shared/schema';
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
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2, CheckCircle, Upload, Shield, Users } from 'lucide-react';

const Submit: FC = () => {
  const { walletAddress, isConnected, connect } = useWeb3();
  const { toast } = useToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ArtworkSubmissionForm>({
    resolver: zodResolver(artworkSubmissionFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: undefined,
      artistName: '',
      artistEmail: '',
      walletAddress: walletAddress || '',
      imageFileName: '',
      terms: false,
    },
  });

  // Update wallet address in form when user connects
  useState(() => {
    if (walletAddress) {
      form.setValue('walletAddress', walletAddress);
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ArtworkSubmissionForm) => {
      // Remove the 'email' and 'terms' fields as they're not in the schema
      const { email, terms, ...submissionData } = data;
      
      // Add the email to the artistEmail field if not already set
      if (!submissionData.artistEmail && email) {
        submissionData.artistEmail = email;
      }
      
      return await apiRequest('POST', '/api/submit', submissionData);
    },
    onSuccess: () => {
      toast({
        title: "Submission Successful",
        description: "Your artwork has been submitted for review.",
      });
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your artwork.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      form.setValue('imageFileName', file.name);
    }
  };

  const onSubmit = (data: ArtworkSubmissionForm) => {
    if (!selectedFileName) {
      toast({
        title: "Missing Artwork File",
        description: "Please upload an image file for your artwork",
        variant: "destructive",
      });
      return;
    }
    
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Submission Received!</CardTitle>
            <CardDescription className="text-center">
              Thank you for submitting your artwork to the VeChain Art Gallery
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              Your submission has been received and is now pending review by our team.
              We'll notify you once your artwork has been approved and added to the gallery.
            </p>
            <div className="border rounded-lg p-4 bg-neutral-50 mb-6">
              <p className="font-medium">Next Steps:</p>
              <ol className="text-left list-decimal pl-6 mt-2 space-y-2">
                <li>Our curation team will review your submission</li>
                <li>If approved, your artwork will be minted on the VeChain blockchain</li>
                <li>You'll receive a notification when your artwork is live</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href = '/'}>
              Return to Gallery
            </Button>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="submission-section">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-primary p-8 text-white flex items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Submit Your Artwork</h2>
              <p className="text-neutral-100 mb-6">
                Have your digital art featured on the VeChain blockchain. Get discovered and connect with collectors
                around the world.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Secure blockchain storage for your creations</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Artist profile highlighting your portfolio</span>
                </li>
                <li className="flex items-start">
                  <Upload className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Exposure to VeChain community and collectors</span>
                </li>
              </ul>
              <p className="text-sm text-neutral-200">*All submissions are reviewed manually by our team</p>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artwork Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title of your artwork" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your artwork, its inspiration, and meaning"
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="abstract">Abstract</SelectItem>
                            <SelectItem value="landscape">Landscape</SelectItem>
                            <SelectItem value="portrait">Portrait</SelectItem>
                            <SelectItem value="3d">3D Artwork</SelectItem>
                            <SelectItem value="animation">Animation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (VET)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            step="0.01" 
                            placeholder="Enter price in VET"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value ? parseFloat(e.target.value) : undefined;
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name or pseudonym" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your contact email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VeChain Wallet Address</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="Your VeChain wallet address"
                            {...field}
                            disabled={isConnected}
                          />
                        </FormControl>
                        {!isConnected && (
                          <Button 
                            type="button" 
                            variant="secondary" 
                            onClick={handleConnectWallet}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                      <FormDescription>
                        Connect your VeChain wallet or enter your address manually
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageFileName"
                  render={({ field }) => (
                    <FormItem className="border-2 border-dashed border-neutral-300 rounded-md px-6 py-8 text-center">
                      <FormLabel className="sr-only">Artwork File</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-neutral-400 mb-2" />
                          <p className="mt-2 text-sm text-neutral-600">
                            {selectedFileName 
                              ? `Selected: ${selectedFileName}`
                              : (
                                <>
                                  Drag and drop your file here, or <span className="text-primary font-medium cursor-pointer" onClick={() => document.getElementById('artwork-file')?.click()}>browse</span>
                                </>
                              )
                            }
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">PNG, JPG, GIF, MP4, WEBM up to 50MB</p>
                          <Input
                            id="artwork-file"
                            type="file"
                            className="hidden"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                          />
                          <input type="hidden" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I confirm this is my original artwork and I agree to the 
                          <a href="#" className="text-primary hover:text-primary-dark ml-1">
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
                  className="w-full bg-secondary hover:bg-secondary-dark text-white"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Artwork'
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
