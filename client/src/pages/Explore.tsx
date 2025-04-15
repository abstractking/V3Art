import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtworkCard from '@/components/artwork/ArtworkCard';
import ArtworkDetailModal from '@/components/artwork/ArtworkDetailModal';
import { Artwork, Artist } from '@shared/schema';
import { Loader2, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Explore: FC = () => {
  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: artworks, isLoading: artworksLoading } = useQuery<Artwork[]>({
    queryKey: ['/api/artworks'],
  });
  
  const { data: artists, isLoading: artistsLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const openArtworkModal = (artworkId: number) => {
    setSelectedArtworkId(artworkId);
    setDetailModalOpen(true);
  };

  // Find the artist for a given artwork
  const findArtistForArtwork = (artistId: number) => {
    return artists?.find(artist => artist.id === artistId);
  };

  // Filter artworks based on search query and category
  const filteredArtworks = artworks?.filter(artwork => {
    const matchesSearch = 
      searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === 'all' || artwork.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from artworks
  const categories = ['all', ...new Set(artworks?.map(artwork => artwork.category) || [])];

  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Explore Digital Artworks</h1>
          <p className="text-neutral-600 max-w-3xl">
            Discover unique digital artworks created by talented artists and secured on the VeChain blockchain.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              className="pl-10"
              placeholder="Search artworks by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5 text-neutral-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Artworks Grid */}
        {artworksLoading || artistsLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredArtworks && filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map(artwork => {
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
          <div className="text-center py-16 bg-neutral-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No Artworks Found</h3>
            <p className="text-neutral-600 mb-4">
              {searchQuery || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'No artworks available at the moment.'}
            </p>
            {(searchQuery || categoryFilter !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
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

export default Explore;
