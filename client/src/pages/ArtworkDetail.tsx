import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Artwork, Artist } from '@shared/schema';
import { useWeb3 } from '@/hooks/use-web3';
import { format } from 'date-fns';
import { ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ArtworkDetail: FC = () => {
  const [, params] = useRoute('/artworks/:id');
  const artworkId = params?.id ? parseInt(params.id) : null;

  const { isConnected, connect } = useWeb3();
  const { toast } = useToast();

  const { data: artwork, isLoading: artworkLoading } = useQuery<Artwork>({
    queryKey: [`/api/artworks/${artworkId}`],
    enabled: !!artworkId,
  });

  const { data: artist, isLoading: artistLoading } = useQuery<Artist>({
    queryKey: [`/api/artists/${artwork?.artistId}`],
    enabled: !!artwork?.artistId,
  });

  const handlePurchase = async () => {
    if (!isConnected) {
      await connect();
      return;
    }

    // In a real app, this would handle the purchase logic via VeChain transactions
    toast({
      title: "Purchase Initiated",
      description: "This is a demo. In a real application, this would initiate a VeChain transaction.",
    });
  };

  // Format date for display
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
  };

  if (artworkLoading || artistLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!artwork || !artist) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Artwork Not Found</h3>
          <p className="text-neutral-600 mb-4">The artwork you're looking for does not exist or has been removed.</p>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <img 
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-neutral-300 overflow-hidden">
                <img 
                  src={artist.profileImage}
                  alt={`${artist.name}'s avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <span className="text-sm text-neutral-600">Created by</span>
                <Link href={`/artists/${artist.id}`}>
                  <a className="block text-primary hover:underline font-medium">{artist.name}</a>
                </Link>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-neutral-600">{artwork.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-neutral-500 text-sm">Creation Date</p>
                  <p className="font-medium">{formatDate(artwork.createdAt)}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Token ID</p>
                  <p className="font-medium">{artwork.tokenId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Category</p>
                  <p className="font-medium capitalize">{artwork.category}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Edition</p>
                  <p className="font-medium">1 of 1</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Blockchain</p>
                  <p className="font-medium">VeChain</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">File Type</p>
                  <p className="font-medium">
                    {artwork.imageUrl.split('.').pop()?.toUpperCase() || 'Digital'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8 p-4 bg-neutral-100 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-neutral-500 text-sm">Current Price</p>
                  <p className="text-3xl font-bold">{artwork.price} VET</p>
                </div>
                <Button 
                  className="bg-secondary hover:bg-secondary-dark text-white" 
                  onClick={handlePurchase}
                >
                  {isConnected ? 'Purchase' : 'Connect to Purchase'}
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Transaction History</h2>
              <div className="border rounded-lg">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Created</p>
                      <p className="text-xs text-neutral-500">by {artist.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(artwork.createdAt)}</p>
                    <p className="text-xs text-neutral-500">Tx: {artwork.tokenId ? `0x${artwork.tokenId}` : 'Pending'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="flex items-center gap-2 mx-auto">
                  <ExternalLink className="h-4 w-4" />
                  View on VeChain Explorer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
