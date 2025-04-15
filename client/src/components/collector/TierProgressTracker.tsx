import { FC } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight, Info, Trophy, Award, Star, Shield } from 'lucide-react';

interface TierProgressTrackerProps {
  currentTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  b3trEarned: number;
  nftsVerified: number;
  artistsSupported: number;
}

interface TierDetail {
  name: string;
  icon: React.ReactNode;
  color: string;
  requiredB3tr: number;
  requiredNfts: number;
  requiredArtists: number;
  benefits: string[];
}

const TierProgressTracker: FC<TierProgressTrackerProps> = ({
  currentTier,
  b3trEarned,
  nftsVerified,
  artistsSupported
}) => {
  const tiers: Record<string, TierDetail> = {
    bronze: {
      name: 'Bronze',
      icon: <Award className="h-5 w-5" />,
      color: 'bg-amber-700',
      requiredB3tr: 0,
      requiredNfts: 0,
      requiredArtists: 0,
      benefits: [
        'Basic verification features',
        'Access to community events',
        'Standard B3TR rewards'
      ]
    },
    silver: {
      name: 'Silver',
      icon: <Award className="h-5 w-5" />,
      color: 'bg-slate-400',
      requiredB3tr: 100,
      requiredNfts: 3,
      requiredArtists: 2,
      benefits: [
        'All Bronze benefits',
        '+10% B3TR rewards',
        'Early access to new features'
      ]
    },
    gold: {
      name: 'Gold',
      icon: <Trophy className="h-5 w-5" />,
      color: 'bg-yellow-500',
      requiredB3tr: 250,
      requiredNfts: 5,
      requiredArtists: 3,
      benefits: [
        'All Silver benefits',
        '+25% B3TR rewards',
        'Exclusive collector badge',
        'Special platform events'
      ]
    },
    platinum: {
      name: 'Platinum',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-indigo-400',
      requiredB3tr: 500,
      requiredNfts: 10,
      requiredArtists: 5,
      benefits: [
        'All Gold benefits',
        '+50% B3TR rewards',
        'Priority verification',
        'Exclusive art drops access',
        'Free VeChain NFT'
      ]
    },
    diamond: {
      name: 'Diamond',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-cyan-400',
      requiredB3tr: 1000,
      requiredNfts: 20,
      requiredArtists: 10,
      benefits: [
        'All Platinum benefits',
        '+100% B3TR rewards',
        'Diamond collector status',
        'Early access to exclusive collections',
        'Direct line to platform developers',
        'VIP community events'
      ]
    }
  };

  const tierOrder = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const currentTierIndex = tierOrder.indexOf(currentTier);
  const nextTier = currentTierIndex < tierOrder.length - 1 ? tierOrder[currentTierIndex + 1] : null;

  // Calculate progress percentages
  const calculateProgress = (current: number, required: number) => {
    if (required === 0) return 100;
    return Math.min(Math.round((current / required) * 100), 100);
  };

  // No next tier if already at diamond
  if (!nextTier) {
    return (
      <Card className="border-2 border-cyan-400/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Maximum Tier Achieved</CardTitle>
            <Badge className="bg-cyan-400 text-black">Diamond</Badge>
          </div>
          <CardDescription>Congratulations! You've reached the highest collector tier.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="bg-cyan-400/20 rounded-full p-4">
              <div className="bg-cyan-400 rounded-full p-4 text-white">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm">Diamond Tier Benefits:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {tiers.diamond.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const nextTierDetails = tiers[nextTier];
  
  const b3trProgress = calculateProgress(b3trEarned, nextTierDetails.requiredB3tr);
  const nftsProgress = calculateProgress(nftsVerified, nextTierDetails.requiredNfts);
  const artistsProgress = calculateProgress(artistsSupported, nextTierDetails.requiredArtists);
  
  // Calculate overall progress (average of all three)
  const overallProgress = Math.round((b3trProgress + nftsProgress + artistsProgress) / 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Tier Progress</CardTitle>
          <Badge className={`${tiers[currentTier].color} text-white`}>
            {tiers[currentTier].name}
          </Badge>
        </div>
        <CardDescription>Progress toward {nextTierDetails.name} tier</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className={`${tiers[currentTier].color} text-white p-3 rounded-full`}>
            {tiers[currentTier].icon}
          </div>
          <div className="flex-1">
            <Progress value={overallProgress} className="h-2 mb-2" />
            <div className="text-sm text-muted-foreground text-center">
              {overallProgress}% Complete
            </div>
          </div>
          <div className={`${nextTierDetails.color} text-white p-3 rounded-full opacity-50`}>
            {nextTierDetails.icon}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>$B3TR Earned</span>
              <span>{b3trEarned}/{nextTierDetails.requiredB3tr}</span>
            </div>
            <Progress value={b3trProgress} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>NFTs Verified</span>
              <span>{nftsVerified}/{nextTierDetails.requiredNfts}</span>
            </div>
            <Progress value={nftsProgress} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Artists Supported</span>
              <span>{artistsSupported}/{nextTierDetails.requiredArtists}</span>
            </div>
            <Progress value={artistsProgress} className="h-2" />
          </div>
        </div>

        <div className="mt-6 bg-secondary/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm flex items-center">
              <span className={`${nextTierDetails.color} h-2 w-2 rounded-full mr-2`}></span>
              {nextTierDetails.name} Tier Benefits:
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">
                    Complete all requirements to reach the {nextTierDetails.name} tier and unlock these benefits
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {nextTierDetails.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                {benefit}
              </li>
            ))}
            {nextTierDetails.benefits.length > 3 && (
              <li className="text-xs text-muted-foreground/70 pl-4 mt-1">
                +{nextTierDetails.benefits.length - 3} more benefits
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <span>View All Tier Benefits</span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TierProgressTracker;