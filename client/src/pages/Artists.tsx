import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtistCard from '@/components/artist/ArtistCard';
import { Artist } from '@shared/schema';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Artists: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: artists, isLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  // Filter artists based on search query
  const filteredArtists = artists?.filter(artist => 
    searchQuery === '' || 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.biography?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Discover Digital Artists</h1>
        <p className="text-neutral-600 max-w-3xl">
          Explore the talented artists creating stunning digital artwork on the VeChain blockchain.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <Input
            className="pl-10"
            placeholder="Search artists by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Artists Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : filteredArtists && filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No Artists Found</h3>
          <p className="text-neutral-600">
            {searchQuery 
              ? 'Try adjusting your search'
              : 'No artists available at the moment.'}
          </p>
        </div>
      )}
    </section>
  );
};

export default Artists;
