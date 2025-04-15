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
      className="artwork-card bg-white rounded-lg shadow-md overflow-hidden transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className={`artwork-image w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-103' : ''}`}
        />
        <div className={`absolute inset-0 bg-neutral-900 bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={onClick}
            className="bg-white bg-opacity-90 text-neutral-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-100 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-neutral-900">{artwork.title}</h3>
        <div className="flex items-center mt-2">
          <div className="h-8 w-8 rounded-full bg-neutral-300 overflow-hidden">
            <img 
              src={artist.profileImage} 
              alt={`${artist.name}'s avatar`}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 text-sm text-neutral-600">
            by <Link href={`/artists/${artist.id}`}><a className="text-primary hover:underline">{artist.name}</a></Link>
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-neutral-500 text-xs">
            <span className="font-medium">Token ID:</span> {artwork.tokenId || 'N/A'}
          </div>
          <div className="flex items-center text-neutral-600">
            <span className="font-medium text-sm">{artwork.price} VET</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
