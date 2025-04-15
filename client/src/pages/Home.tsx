import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ArtworkCard from '@/components/artwork/ArtworkCard';
import ArtistCard from '@/components/artist/ArtistCard';
import ArtworkDetailModal from '@/components/artwork/ArtworkDetailModal';
import { Artist, Artwork } from '@shared/schema';
import { Loader2 } from 'lucide-react';

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
      <section className="relative bg-neutral-950 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-primary to-secondary opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Digital Art Powered by VeChain</h2>
            <p className="text-xl text-neutral-200 mb-8">Discover, collect, and submit artwork secured by blockchain technology</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explore">
                <Button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-md font-medium shadow-lg transition-colors">
                  Explore Gallery
                </Button>
              </Link>
              <Link href="/submit">
                <Button variant="outline" className="bg-white text-neutral-900 hover:bg-neutral-100 px-6 py-3 rounded-md font-medium shadow-lg transition-colors">
                  Submit Artwork
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Artworks</h2>
          <Link href="/explore">
            <a className="text-primary hover:text-primary-dark font-medium">View All</a>
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
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600">No artworks available at the moment.</p>
          </div>
        )}
      </section>

      {/* Featured Artists Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-neutral-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Artists</h2>
          <Link href="/artists">
            <a className="text-primary hover:text-primary-dark font-medium">View All</a>
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
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-neutral-600">No artists available at the moment.</p>
          </div>
        )}
      </section>

      {/* VeChain Blockchain Integration Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-neutral-950 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powered by VeChain</h2>
          <p className="max-w-2xl mx-auto text-neutral-300">
            Our platform leverages VeChain's enterprise-grade public blockchain for digital art authentication,
            ownership tracking, and secure transactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
            <p className="text-neutral-400">
              Every artwork is securely stored with cryptographic proof of authenticity and ownership on the VeChain blockchain.
            </p>
          </div>
          
          <div className="bg-neutral-900 p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Transparent Transactions</h3>
            <p className="text-neutral-400">
              All sales and transfers are recorded on the blockchain, providing complete transparency and provenance tracking.
            </p>
          </div>
          
          <div className="bg-neutral-900 p-6 rounded-lg">
            <div className="h-12 w-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Energy Efficient</h3>
            <p className="text-neutral-400">
              VeChain's Proof-of-Authority consensus mechanism is environmentally friendly, using minimal computational resources.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="https://www.vechain.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-light hover:text-white font-medium">
            Learn more about VeChain technology
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
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
