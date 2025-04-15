import { FC, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Artwork, Artist } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useWeb3 } from '@/hooks/use-web3';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ArtworkDetailModalProps {
  artworkId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkDetailModal: FC<ArtworkDetailModalProps> = ({ artworkId, isOpen, onClose }) => {
  const { isConnected, connect } = useWeb3();
  const { toast } = useToast();

  const { data: artwork, isLoading: artworkLoading } = useQuery({
    queryKey: [`/api/artworks/${artworkId}`],
    enabled: !!artworkId && isOpen,
  });

  const { data: artist, isLoading: artistLoading } = useQuery({
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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900 bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start p-4 border-b border-neutral-200">
                  <Dialog.Title className="text-xl font-medium">Artwork Details</Dialog.Title>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {(artworkLoading || artistLoading) ? (
                  <div className="flex justify-center items-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : artwork && artist ? (
                  <div className="p-6">
                    <div className="md:flex">
                      <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
                        <div className="bg-neutral-100 rounded-lg overflow-hidden">
                          <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title}
                            className="w-full h-auto" 
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 md:pl-4">
                        <h2 className="text-2xl font-medium mb-2">{artwork.title}</h2>
                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-neutral-300 overflow-hidden">
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
                        
                        <div className="mb-6">
                          <p className="text-neutral-600">{artwork.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-2">Details</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-neutral-500">Creation Date</p>
                              <p className="font-medium">{formatDate(artwork.createdAt)}</p>
                            </div>
                            <div>
                              <p className="text-neutral-500">Token ID</p>
                              <p className="font-medium">{artwork.tokenId || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-neutral-500">Category</p>
                              <p className="font-medium capitalize">{artwork.category}</p>
                            </div>
                            <div>
                              <p className="text-neutral-500">Edition</p>
                              <p className="font-medium">1 of 1</p>
                            </div>
                            <div>
                              <p className="text-neutral-500">Blockchain</p>
                              <p className="font-medium">VeChain</p>
                            </div>
                            <div>
                              <p className="text-neutral-500">File Type</p>
                              <p className="font-medium">
                                {artwork.imageUrl.split('.').pop()?.toUpperCase() || 'Digital'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6 p-4 bg-neutral-100 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-neutral-500 text-sm">Current Price</p>
                              <p className="text-2xl font-semibold">{artwork.price} VET</p>
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
                          <h3 className="text-lg font-medium mb-2">Transaction History</h3>
                          <div className="border rounded-lg divide-y">
                            <div className="p-3 flex justify-between items-center">
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
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <p className="text-center text-neutral-500">Artwork not found</p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArtworkDetailModal;
