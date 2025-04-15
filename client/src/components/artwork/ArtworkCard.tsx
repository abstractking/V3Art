import { FC, useState } from 'react';
import { Link } from 'wouter';
import { Artwork, Artist } from '@shared/schema';

interface ArtworkCardProps {
  artwork: Artwork;
  artist: Artist;
  onClick?: () => void;
}

const ArtworkCard: FC<ArtworkCardProps> = ({ artwork, artist, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="nft-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{artwork.title}</h3>
        <div className="flex items-center mt-2">
          <div className="h-8 w-8 rounded-full bg-secondary overflow-hidden">
            <img 
              src={artist.profileImage || ''} 
              alt={`${artist.name}'s avatar`}
              className="h-full w-full object-cover"
            />
          </div>
          <Link href={`/artists/${artist.id}`}>
            <div className="ml-2 text-sm text-muted-foreground cursor-pointer hover:text-primary">
              by <span className="text-primary">{artist.name}</span>
            </div>
          </Link>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-muted-foreground text-xs">
            <span className="font-medium">Token ID:</span> {artwork.tokenId || 'N/A'}
          </div>
          <div className="bg-primary/10 px-2 py-1 rounded-full">
            <span className="font-bold text-primary text-sm">{artwork.price} VET</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
