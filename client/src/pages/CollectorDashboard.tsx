import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useWeb3 } from '@/hooks/use-web3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import TierProgressTracker from '@/components/collector/TierProgressTracker';
import {
  Coins,
  Droplets,
  Award,
  Star,
  Clock,
  ArrowRight,
  Calendar,
  Loader2,
  AlertCircle,
  Leaf
} from 'lucide-react';

const CollectorDashboard: FC = () => {
  const { walletAddress, isConnected } = useWeb3();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock collector data - In a real app, this would be fetched from the backend
  const collectorData = {
    name: 'Art Collector',
    joinedDate: '2023-11-15',
    b3trBalance: 157.25,
    b3trEarned: 180.5,
    verifiedNFTs: 9,
    supportedArtists: 6,
    level: 2,
    tierLevel: 'silver', // bronze, silver, gold, platinum, diamond
    levelProgress: 68,
    nextLevelThreshold: 250,
    achievements: [
      { id: 1, name: 'Early Supporter', icon: <Clock className="h-4 w-4" />, date: '2023-11-20' },
      { id: 2, name: 'Artist Ally', icon: <Star className="h-4 w-4" />, date: '2023-12-05' },
      { id: 3, name: 'NFT Enthusiast', icon: <Award className="h-4 w-4" />, date: '2024-01-15' },
    ],
    recentActivity: [
      { id: 1, action: 'Verified NFT', nftName: 'Cosmic Journey #42', artist: 'Elena Kroft', date: '2024-04-10', b3trEarned: 15 },
      { id: 2, action: 'Supported Artist', nftName: 'Urban Dreams', artist: 'Michael Chen', date: '2024-04-08', b3trEarned: 10 },
      { id: 3, action: 'Verified NFT', nftName: 'Digital Landscape #7', artist: 'Sarah Williams', date: '2024-04-05', b3trEarned: 15 },
      { id: 4, action: 'Level Up', level: 2, date: '2024-04-01', b3trEarned: 25 },
    ],
    ownedNFTs: [
      { id: 1, name: 'Cosmic Journey #42', artist: 'Elena Kroft', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 2, name: 'Urban Dreams', artist: 'Michael Chen', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 3, name: 'Digital Landscape #7', artist: 'Sarah Williams', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 4, name: 'Abstract Emotions', artist: 'James Wilson', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 5, name: 'Future City', artist: 'Elena Kroft', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 6, name: 'Neon Nights #12', artist: 'Michael Chen', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 7, name: 'Quantum Drift', artist: 'Sarah Williams', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 8, name: 'Tranquil Waters', artist: 'James Wilson', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
      { id: 9, name: 'Cybernetic Vision', artist: 'Elena Kroft', imageUrl: 'https://via.placeholder.com/150', verificationStatus: 'verified' },
    ],
    supportedArtistsList: [
      { id: 1, name: 'Elena Kroft', artworks: 3, supportLevel: 'Platinum' },
      { id: 2, name: 'Michael Chen', artworks: 2, supportLevel: 'Gold' },
      { id: 3, name: 'Sarah Williams', artworks: 2, supportLevel: 'Gold' },
      { id: 4, name: 'James Wilson', artworks: 2, supportLevel: 'Gold' },
    ]
  };

  // Query to fetch collector data - in a real application
  /*
  const {
    data: collectorData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['/api/collector', walletAddress],
    enabled: !!walletAddress && isConnected,
  });
  */

  // For demo purposes, simulate query states
  const isLoading = false;
  const error = null;

  // Simulate watering an artist (supporting)
  const handleWaterArtist = (artistName: string) => {
    toast({
      title: "Artist Watered Successfully",
      description: `You supported ${artistName} and earned 5 $B3TR tokens!`,
    });
  };

  if (!isConnected) {
    return (
      <div className="py-20 px-4 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Wallet Not Connected</h1>
        <p className="mb-6 text-muted-foreground">Please connect your wallet to access your collector dashboard.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Dashboard</h1>
        <p className="mb-6 text-muted-foreground">We encountered an error loading your collector profile. Please try again later.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Collector Profile Header */}
      <div className="mb-8 bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {collectorData.name}
                <Badge variant="outline" className="ml-3 text-xs font-normal">Level {collectorData.level}</Badge>
              </h1>
              <p className="text-muted-foreground">
                <span className="inline-flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(collectorData.joinedDate).toLocaleDateString()}
                </span>
                <span className="mx-2">•</span>
                <span className="inline-flex items-center">
                  <Droplets className="h-4 w-4 mr-1" />
                  Supporting {collectorData.supportedArtists} artists
                </span>
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end justify-center">
              <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg">
                <Coins className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">$B3TR Balance</p>
                  <p className="text-2xl font-bold">{collectorData.b3trBalance}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <div className="text-sm">
                <span className="font-medium">Level Progress:</span> {collectorData.levelProgress}% to Level {collectorData.level + 1}
              </div>
              <div className="text-sm text-muted-foreground">
                {collectorData.levelProgress * collectorData.nextLevelThreshold / 100}/{collectorData.nextLevelThreshold} $B3TR
              </div>
            </div>
            <Progress value={collectorData.levelProgress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="mb-8" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          {/* Tier Progress Tracker */}
          <div className="mb-8">
            <TierProgressTracker 
              currentTier={collectorData.tierLevel as 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'}
              b3trEarned={collectorData.b3trEarned}
              nftsVerified={collectorData.verifiedNFTs}
              artistsSupported={collectorData.supportedArtists}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Verified NFTs</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <Award className="h-7 w-7 text-primary mr-4" />
                  <div className="text-3xl font-bold">{collectorData.verifiedNFTs}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">$B3TR Earned</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <Coins className="h-7 w-7 text-primary mr-4" />
                  <div className="text-3xl font-bold">{collectorData.b3trEarned}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Artists Supported</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <Droplets className="h-7 w-7 text-primary mr-4" />
                  <div className="text-3xl font-bold">{collectorData.supportedArtists}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent interactions on VeCollab</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {collectorData.recentActivity.map((activity) => (
                    <li key={activity.id} className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">
                          {activity.action}
                          {activity.nftName && `: ${activity.nftName}`}
                          {activity.level && ` ${activity.level}`}
                        </p>
                        {activity.artist && <p className="text-sm text-muted-foreground">by {activity.artist}</p>}
                        <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      {activity.b3trEarned && (
                        <div className="flex items-center text-primary">
                          <Coins className="h-4 w-4 mr-1" />
                          <span className="font-medium">+{activity.b3trEarned} $B3TR</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured NFTs</CardTitle>
                <CardDescription>Your verified World of V NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {collectorData.ownedNFTs.slice(0, 6).map((nft) => (
                    <div key={nft.id} className="relative group cursor-pointer">
                      <div className="relative w-full aspect-square overflow-hidden rounded-md bg-secondary">
                        <img src={nft.imageUrl} alt={nft.name} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      {nft.verificationStatus === 'verified' && (
                        <div className="absolute top-1 right-1 bg-primary/90 rounded-full p-1">
                          <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                            <Leaf className="h-3 w-3" />
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTab('nfts')}>
                  View All NFTs
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* NFTs Tab */}
        <TabsContent value="nfts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectorData.ownedNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img src={nft.imageUrl} alt={nft.name} className="absolute inset-0 h-full w-full object-cover" />
                  {nft.verificationStatus === 'verified' && (
                    <div className="absolute top-2 right-2 bg-primary/90 rounded-full p-1">
                      <Badge variant="default" className="h-6 w-6 p-0 flex items-center justify-center rounded-full">
                        <Leaf className="h-4 w-4" />
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{nft.name}</CardTitle>
                  <CardDescription>by {nft.artist}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleWaterArtist(nft.artist)}>
                    <Droplets className="h-4 w-4 mr-2" />
                    Water Artist
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Artists Tab */}
        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collectorData.supportedArtistsList.map((artist) => (
              <Card key={artist.id}>
                <CardHeader>
                  <CardTitle>{artist.name}</CardTitle>
                  <CardDescription>
                    {artist.artworks} {artist.artworks === 1 ? 'artwork' : 'artworks'} verified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant={
                      artist.supportLevel === 'Platinum' ? 'default' :
                      artist.supportLevel === 'Gold' ? 'secondary' : 'outline'
                    }>
                      {artist.supportLevel} Supporter
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => handleWaterArtist(artist.name)}>
                      <Droplets className="h-4 w-4 mr-2" />
                      Water Artist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collectorData.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                    <div className="bg-primary rounded-full p-3 text-primary-foreground">
                      {achievement.icon}
                    </div>
                  </div>
                  <CardTitle>{achievement.name}</CardTitle>
                  <CardDescription>
                    Unlocked on {new Date(achievement.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
            
            {/* Locked Achievement Example */}
            <Card className="opacity-50">
              <CardHeader className="text-center">
                <div className="mx-auto bg-muted p-3 rounded-full mb-4">
                  <div className="bg-muted-foreground/30 rounded-full p-3 text-muted-foreground">
                    <Star className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle>Premium Collector</CardTitle>
                <CardDescription>
                  Verify 10 NFTs to unlock
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollectorDashboard;