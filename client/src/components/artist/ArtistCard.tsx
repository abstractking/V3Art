import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Artist } from '@shared/schema';
import { FileImage, Heart } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-neutral-200 relative">
        <img 
          src={artist.coverImage} 
          alt={`${artist.name}'s cover image`}
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-10 left-4">
          <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-neutral-300">
            <img 
              src={artist.profileImage} 
              alt={artist.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="p-4 pt-12">
        <h3 className="font-medium text-lg">{artist.name}</h3>
        <p className="text-neutral-500 text-sm mb-3">{artist.biography?.split(' ').slice(0, 3).join(' ') || 'Digital Artist'}</p>
        <div className="flex items-center text-xs text-neutral-600 mb-4">
          <div className="flex items-center mr-4">
            <FileImage className="h-4 w-4 mr-1" />
            <span>{artist.artworkCount} Artworks</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            <span>{artist.likesCount > 1000 
              ? `${(artist.likesCount / 1000).toFixed(1)}k` 
              : artist.likesCount} Likes</span>
          </div>
        </div>
        <Link href={`/artists/${artist.id}`}>
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard;
