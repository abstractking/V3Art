import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import ArtworkCard from '@/components/artwork/ArtworkCard';
import ArtworkDetailModal from '@/components/artwork/ArtworkDetailModal';
import { Artist, Artwork } from '@shared/schema';
import { Loader2, FileImage, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ArtistDetail: FC = () => {
  const [, params] = useRoute('/artists/:id');
  const artistId = params?.id ? parseInt(params.id) : null;

  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { data: artist, isLoading: artistLoading } = useQuery<Artist>({
    queryKey: [`/api/artists/${artistId}`],
    enabled: !!artistId,
  });

  const { data: artworks, isLoading: artworksLoading } = useQuery<Artwork[]>({
    queryKey: [`/api/artists/${artistId}/artworks`],
    enabled: !!artistId,
  });

  const openArtworkModal = (artworkId: number) => {
    setSelectedArtworkId(artworkId);
    setDetailModalOpen(true);
  };

  if (artistLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Artist Not Found</h3>
          <p className="text-neutral-600 mb-4">The artist you're looking for does not exist or has been removed.</p>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-neutral-50">
        {/* Artist Header/Banner */}
        <div className="relative h-64 bg-neutral-200">
          <img 
            src={artist.coverImage} 
            alt={`${artist.name}'s cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/2"></div>
        </div>

        {/* Artist Profile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-neutral-300 shadow-lg">
                  <img 
                    src={artist.profileImage} 
                    alt={artist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                    <p className="text-neutral-600 mb-4">{artist.biography}</p>
                  </div>
                  <div className="flex space-x-3 mt-2 md:mt-0">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">View on VeChain</span>
                      <span className="sm:hidden">VeChain</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center">
                    <FileImage className="h-5 w-5 mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-500">Artworks</p>
                      <p className="font-medium">{artist.artworkCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-500">Likes</p>
                      <p className="font-medium">{artist.likesCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div className="text-ellipsis overflow-hidden">
                      <p className="text-sm text-neutral-500">Wallet</p>
                      <p className="font-medium text-xs sm:text-sm">{artist.walletAddress.slice(0, 6)}...{artist.walletAddress.slice(-4)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="artworks">
          <TabsList className="mb-6">
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="artworks">
            {artworksLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : artworks && artworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworks.map(artwork => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork} 
                    artist={artist}
                    onClick={() => openArtworkModal(artwork.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-neutral-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No Artworks Yet</h3>
                <p className="text-neutral-600">This artist has not uploaded any artworks yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">About the Artist</h2>
              <p className="text-neutral-600 mb-6">{artist.biography}</p>
              
              <h3 className="text-lg font-semibold mb-3">Blockchain Details</h3>
              <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">VeChain Address</p>
                    <p className="font-medium break-all">{artist.walletAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Artworks Minted</p>
                    <p className="font-medium">{artist.artworkCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Profile on VeChainStats
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Artwork Detail Modal */}
      <ArtworkDetailModal
        artworkId={selectedArtworkId}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </>
  );
};

export default ArtistDetail;
