
import { FC, useState } from 'react';
import { Link } from 'wouter';
import { Artwork, Artist } from '@shared/schema';
import { motion } from 'framer-motion';

interface ArtworkCardProps {
  artwork: Artwork;
  artist: Artist;
  onClick?: () => void;
}

const ArtworkCard: FC<ArtworkCardProps> = ({ artwork, artist, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="artwork-card bg-background border border-border rounded-xl overflow-hidden transition-all hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
        <div 
          className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            className="bg-vechain hover:bg-vechain-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{artwork.title}</h3>
        <div className="flex items-center mt-3">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img 
              src={artist.profileImage} 
              alt={artist.name}
              className="h-full w-full object-cover"
            />
          </div>
          <Link href={`/artists/${artist.id}`}>
            <a className="ml-2 text-sm text-foreground/80 hover:text-vechain transition-colors">
              {artist.name}
            </a>
          </Link>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-foreground/60">#{artwork.tokenId || 'N/A'}</span>
          <span className="text-vechain font-medium">{artwork.price} VET</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
