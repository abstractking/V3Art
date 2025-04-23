import { 
  users, type User, type InsertUser,
  artists, type Artist, type InsertArtist,
  artworks, type Artwork, type InsertArtwork,
  artworkSubmissions, type ArtworkSubmission, type InsertArtworkSubmission,
  nftSubmissions, type NftSubmission, type InsertNftSubmission
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logWalletLogin(walletAddress: string): void;
  getLoggedInWallets(): string[];

  // Artist methods
  getArtist(id: number): Promise<Artist | undefined>;
  getArtistByWalletAddress(walletAddress: string): Promise<Artist | undefined>;
  getArtists(limit?: number): Promise<Artist[]>;
  createArtist(artist: InsertArtist): Promise<Artist>;

  // Artwork methods
  getArtwork(id: number): Promise<Artwork | undefined>;
  getArtworksByArtistId(artistId: number): Promise<Artwork[]>;
  getArtworks(limit?: number): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;

  // Artwork Submission methods
  submitArtwork(submission: InsertArtworkSubmission): Promise<ArtworkSubmission>;
  getSubmission(id: number): Promise<ArtworkSubmission | undefined>;
  getAllSubmissions(): Promise<ArtworkSubmission[]>;
  updateSubmissionStatus(id: number, status: string): Promise<ArtworkSubmission>;

  // NFT Submission methods
  submitNft(submission: InsertNftSubmission): Promise<NftSubmission>;
  getNftSubmission(id: number): Promise<NftSubmission | undefined>;
  getAllNftSubmissions(): Promise<NftSubmission[]>;
  updateNftSubmissionStatus(id: number, status: string): Promise<NftSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private artists: Map<number, Artist>;
  private artworks: Map<number, Artwork>;
  private submissions: Map<number, ArtworkSubmission>;
  private nftSubmissions: Map<number, NftSubmission>;
  private loggedInWallets: Set<string>; // Track logged-in wallets
  private userId: number;
  private artistId: number;
  private artworkId: number;
  private submissionId: number;
  private nftSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.artists = new Map();
    this.artworks = new Map();
    this.submissions = new Map();
    this.nftSubmissions = new Map();
    this.loggedInWallets = new Set(); // Initialize the wallet tracker
    this.userId = 1;
    this.artistId = 1;
    this.artworkId = 1;
    this.submissionId = 1;
    this.nftSubmissionId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  logWalletLogin(walletAddress: string): void {
    this.loggedInWallets.add(walletAddress); // Add the wallet address to the set
  }

  getLoggedInWallets(): string[] {
    return Array.from(this.loggedInWallets); // Return all logged-in wallets
  }

  // Artist methods
  async getArtist(id: number): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async getArtistByWalletAddress(walletAddress: string): Promise<Artist | undefined> {
    return Array.from(this.artists.values()).find(
      (artist) => artist.walletAddress === walletAddress,
    );
  }

  async getArtists(limit?: number): Promise<Artist[]> {
    const allArtists = Array.from(this.artists.values());
    return limit ? allArtists.slice(0, limit) : allArtists;
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = this.artistId++;
    const artist: Artist = { 
      ...insertArtist, 
      id,
      artworkCount: 0,
      likesCount: 0
    };
    this.artists.set(id, artist);
    return artist;
  }

  // Artwork methods
  async getArtwork(id: number): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async getArtworksByArtistId(artistId: number): Promise<Artwork[]> {
    return Array.from(this.artworks.values()).filter(
      (artwork) => artwork.artistId === artistId,
    );
  }

  async getArtworks(limit?: number): Promise<Artwork[]> {
    const allArtworks = Array.from(this.artworks.values())
      .filter(artwork => artwork.isApproved);
    return limit ? allArtworks.slice(0, limit) : allArtworks;
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = this.artworkId++;
    const artwork: Artwork = { 
      ...insertArtwork, 
      id,
      createdAt: new Date(),
      isApproved: true
    };
    this.artworks.set(id, artwork);
    
    // Update artist artwork count
    const artist = await this.getArtist(artwork.artistId);
    if (artist) {
      artist.artworkCount = (artist.artworkCount || 0) + 1;
      this.artists.set(artist.id, artist);
    }
    
    return artwork;
  }

  // Artwork Submission methods
  async submitArtwork(insertSubmission: InsertArtworkSubmission): Promise<ArtworkSubmission> {
    const id = this.submissionId++;
    const submission: ArtworkSubmission = { 
      ...insertSubmission, 
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async getSubmission(id: number): Promise<ArtworkSubmission | undefined> {
    return this.submissions.get(id);
  }

  async getAllSubmissions(): Promise<ArtworkSubmission[]> {
    return Array.from(this.submissions.values());
  }

  async updateSubmissionStatus(id: number, status: string): Promise<ArtworkSubmission> {
    const submission = await this.getSubmission(id);
    if (!submission) {
      throw new Error(`Submission with id ${id} not found`);
    }
    
    const updatedSubmission = {
      ...submission,
      status
    };
    
    this.submissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
  
  // NFT Submission methods
  async submitNft(insertSubmission: InsertNftSubmission): Promise<NftSubmission> {
    const id = this.nftSubmissionId++;
    const submission: NftSubmission = { 
      ...insertSubmission, 
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.nftSubmissions.set(id, submission);
    return submission;
  }

  async getNftSubmission(id: number): Promise<NftSubmission | undefined> {
    return this.nftSubmissions.get(id);
  }

  async getAllNftSubmissions(): Promise<NftSubmission[]> {
    return Array.from(this.nftSubmissions.values());
  }

  async updateNftSubmissionStatus(id: number, status: string): Promise<NftSubmission> {
    const submission = await this.getNftSubmission(id);
    if (!submission) {
      throw new Error(`NFT Submission with id ${id} not found`);
    }
    
    const updatedSubmission = {
      ...submission,
      status
    };
    
    this.nftSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  // Initialize with sample data
  private initializeSampleData() {
    // Sample Artists
    const artists: InsertArtist[] = [
      {
        name: "Elena Kroft",
        biography: "Abstract Digital Artist specializing in geometric forms and vibrant colors.",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
        walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      },
      {
        name: "Michael Chen",
        biography: "Landscape Digital Artist creating immersive digital environments.",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        name: "Sarah Lee",
        biography: "Portrait Artist specializing in digital character art and emotional expressions.",
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        coverImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73",
        walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
      },
      {
        name: "James Wilson",
        biography: "3D Artist creating immersive sculptures and environments with a focus on realism.",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        coverImage: "https://images.unsplash.com/photo-1506252374453-ef5237291d83",
        walletAddress: "0xdef1234567890abcdef1234567890abcdef123456",
      }
    ];

    // Create artists
    const createdArtists: Artist[] = [];
    for (const artist of artists) {
      const createdArtist = {
        ...artist,
        id: this.artistId++,
        artworkCount: 0,
        likesCount: 0,
      };
      this.artists.set(createdArtist.id, createdArtist);
      createdArtists.push(createdArtist);
    }

    // Sample Artworks
    const artworks: InsertArtwork[] = [
      {
        title: "Transcendent Shapes",
        description: "An exploration of geometric forms and vibrant colors in the digital space.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        category: "abstract",
        price: 3.5,
        tokenId: "34829",
        artistId: createdArtists[0].id,
      },
      {
        title: "Digital Horizon",
        description: "A digital landscape portraying the boundary between technology and nature.",
        imageUrl: "https://images.unsplash.com/photo-1633532482485-b3cb5a9a4135",
        category: "landscape",
        price: 5.2,
        tokenId: "27156",
        artistId: createdArtists[1].id,
      },
      {
        title: "Neon Dreams",
        description: "A portrait exploring human emotion through digital manipulation and vibrant colors.",
        imageUrl: "https://images.unsplash.com/photo-1614107096292-b2b312de0c34",
        category: "portrait",
        price: 7.8,
        tokenId: "18973",
        artistId: createdArtists[2].id,
      }
    ];

    // Create artworks
    for (const artwork of artworks) {
      const createdArtwork = {
        ...artwork,
        id: this.artworkId++,
        createdAt: new Date(),
        isApproved: true,
      };
      this.artworks.set(createdArtwork.id, createdArtwork);
      
      // Update artist artwork count
      const artist = this.artists.get(createdArtwork.artistId);
      if (artist) {
        artist.artworkCount = (artist.artworkCount || 0) + 1;
        this.artists.set(artist.id, artist);
      }
    }
  }
}

export const storage = new MemStorage();
