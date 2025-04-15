import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Artist } from '@shared/schema';
import { FileImage, Heart, ArrowRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="profile-card group">
        <div className="h-40 bg-black/10 dark:bg-white/5 relative overflow-hidden">
          <img 
            src={artist.coverImage || ''} 
            alt={`${artist.name}'s cover image`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          
          <div className="absolute -bottom-10 left-4 transition-transform duration-300 group-hover:scale-105">
            <div className="h-20 w-20 rounded-full border-4 border-card overflow-hidden bg-secondary">
              <img 
                src={artist.profileImage || ''} 
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="p-4 pt-12">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{artist.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{artist.biography?.split(' ').slice(0, 3).join(' ') || 'Digital Artist'}</p>
            </div>
            <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-4">
            <div className="flex items-center mr-4">
              <FileImage className="h-4 w-4 mr-1" />
              <span>{artist.artworkCount} NFTs</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-primary" />
              <span>{(artist.likesCount || 0) > 1000 
                ? `${((artist.likesCount || 0) / 1000).toFixed(1)}k` 
                : artist.likesCount || 0} Likes</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
