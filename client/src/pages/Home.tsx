import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ArtworkCard from '@/components/artwork/ArtworkCard';
import ArtistCard from '@/components/artist/ArtistCard';
import ArtworkDetailModal from '@/components/artwork/ArtworkDetailModal';
import { Artist, Artwork } from '@shared/schema';
import { Loader2, ImageIcon } from 'lucide-react';

const Home: FC = () => {
  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { data: artists, isLoading: artistsLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists?limit=4'],
  });

  const { data: artworks, isLoading: artworksLoading } = useQuery<Artwork[]>({
    queryKey: ['/api/artworks?limit=3'],
  });

  const openArtworkModal = (artworkId: number) => {
    setSelectedArtworkId(artworkId);
    setDetailModalOpen(true);
  };

  // Find the artist for a given artwork
  const findArtistForArtwork = (artistId: number) => {
    return artists?.find(artist => artist.id === artistId);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="hero-title">
              Discover, Collect & Sell<br/>
              <span className="hero-accent">NFTs</span> on VeChain
            </h1>
            <p className="hero-subtitle">
              The premier decentralized marketplace for VeChain NFTs. Buy, sell, and collect unique digital assets powered by VeChain blockchain technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/explore">
                <Button className="button-primary">
                  Explore NFTs
                </Button>
              </Link>
              <Link href="/submit">
                <Button className="button-secondary">
                  Create NFT
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-[#161F37] p-2 rounded-xl shadow-xl overflow-hidden">
                {artworks && artworks.length > 0 ? (
                  <div className="aspect-square rounded-lg overflow-hidden bg-black/20 relative">
                    <img 
                      src={artworks[0].imageUrl} 
                      alt={artworks[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-white">{artworks[0].title}</h3>
                          <div className="text-xs text-white/70">@{findArtistForArtwork(artworks[0].artistId)?.name}</div>
                        </div>
                        <div className="flex items-center bg-primary/20 px-2 py-1 rounded text-white text-sm">
                          <span className="font-bold">{artworks[0].price} VET</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg overflow-hidden bg-black/20 flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-white/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured NFTs</h2>
          <Link href="/explore">
            <div className="text-primary hover:text-primary/90 font-medium cursor-pointer">
              View All
            </div>
          </Link>
        </div>

        {artworksLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : artworks && artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(artwork => {
              const artist = findArtistForArtwork(artwork.artistId);
              if (!artist) return null;
              
              return (
                <ArtworkCard 
                  key={artwork.id} 
                  artwork={artwork} 
                  artist={artist}
                  onClick={() => openArtworkModal(artwork.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <p className="text-muted-foreground">No NFTs available at the moment.</p>
          </div>
        )}
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/30 dark:bg-secondary/10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Artists</h2>
          <Link href="/artists">
            <div className="text-primary hover:text-primary/90 font-medium cursor-pointer">
              View All
            </div>
          </Link>
        </div>

        {artistsLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : artists && artists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-muted-foreground">No artists available at the moment.</p>
          </div>
        )}
      </section>

      {/* VeChain Blockchain Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powered by <span className="text-primary">VeChain</span></h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Our platform leverages VeChain's enterprise-grade public blockchain for NFT authentication,
            ownership tracking, and secure transactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-xl shadow-sm card-hover">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground">
              Every NFT is securely stored with cryptographic proof of authenticity and ownership on the VeChain blockchain.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-sm card-hover">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Transparent Transactions</h3>
            <p className="text-muted-foreground">
              All sales and transfers are recorded on the blockchain, providing complete transparency and provenance tracking.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-sm card-hover">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Energy Efficient</h3>
            <p className="text-muted-foreground">
              VeChain's Proof-of-Authority consensus mechanism is environmentally friendly, using minimal computational resources.
            </p>
          </div>
        </div>
      </section>

      {/* Artwork Detail Modal */}
      <ArtworkDetailModal
        artworkId={selectedArtworkId}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </>
  );
};

export default Home;
