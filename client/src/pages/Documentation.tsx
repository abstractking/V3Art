import { FC } from 'react';
import { Share2, Shield, Droplets, Coins, Heart, BarChart3, Globe, Users } from 'lucide-react';

const Documentation: FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">VeCollab Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering artists through blockchain verification and sustainable income
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            VeCollab is a decentralized application (dApp) built on the VeChain blockchain with a clear mission: 
            to create a sustainable ecosystem where independent artists receive ongoing support from collectors 
            and enthusiasts for their creative work.
          </p>
          <p className="text-lg mb-6">
            By leveraging blockchain technology, we provide a transparent, secure platform that verifies World of V 
            art ownership and connects artists directly with their audience, eliminating traditional intermediaries 
            and ensuring artists receive fair compensation for their work.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Our Vision</h3>
            <p className="italic">
              "A world where independent artists can sustain themselves through their creativity, supported by a 
              community of collectors who directly contribute to their ongoing success."
            </p>
          </div>
        </div>

        {/* How It Works */}
        <h2 className="text-3xl font-bold mb-10 text-center">How VeCollab Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Verification System</h3>
            <p className="text-muted-foreground">
              Collectors submit their World of V art for manual verification by our team. We check the 
              authenticity of each submission by confirming ownership through the VeChain blockchain, 
              ensuring all displayed art is genuine and properly attributed.
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Droplets className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">The Watering Mechanism</h3>
            <p className="text-muted-foreground">
              Our platform introduces a unique "watering" concept where collectors can nurture artists' growth 
              by supporting their work. Through this mechanism, collectors interact with their verified art pieces, 
              providing ongoing support to the creators they appreciate.
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Coins className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">$B3TR Rewards</h3>
            <p className="text-muted-foreground">
              Collectors earn $B3TR tokens as rewards for supporting independent artists. These tokens represent 
              your contribution to the creative ecosystem and can be used within our platform for various benefits 
              and to further support artists you admire.
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Direct Artist Support</h3>
            <p className="text-muted-foreground">
              Our platform creates a direct connection between collectors and artists. When collectors "water" artists 
              by engaging with their verified art, artists receive tangible support - creating a sustainable income 
              stream that helps them continue their creative work.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <h2 className="text-3xl font-bold mb-10 text-center">Benefits of Our Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card rounded-xl p-6 border border-border">
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Artists</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Sustainable income through ongoing collector support</li>
              <li>• Direct connection with their audience</li>
              <li>• Verified ownership and proper attribution</li>
              <li>• Reduced reliance on intermediaries</li>
              <li>• Community recognition and exposure</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Collectors</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• $B3TR token rewards for supporting artists</li>
              <li>• Verified authentic World of V art pieces</li>
              <li>• Direct impact on artists' careers</li>
              <li>• Connection to a community of art enthusiasts</li>
              <li>• Transparent ownership records on blockchain</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">For The Ecosystem</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Sustainable support for artistic creation</li>
              <li>• Reduced economic barriers between creators and audience</li>
              <li>• Transparent verification of art ownership</li>
              <li>• Community-powered growth model</li>
              <li>• Environmentally friendly blockchain implementation</li>
            </ul>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Striving for a Sustainable Future</h2>
          <p className="text-lg mb-6">
            At VeCollab, we're building more than just a platform—we're creating a movement toward sustainable income 
            for independent artists worldwide. Our vision extends beyond the immediate benefits of blockchain 
            verification and focuses on long-term artist sustainability.
          </p>
          <p className="text-lg mb-6">
            By connecting collectors directly with artists through our watering mechanism and $B3TR rewards, we're 
            establishing an ecosystem where creativity is properly valued and supported. Our goal is to see artists 
            thrive through their work, relying less on commissioned projects and more on the ongoing support of 
            their collector community.
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Our Roadmap Includes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background/80 backdrop-blur p-4 rounded-lg">
                <BarChart3 className="text-primary h-6 w-6 mb-2" />
                <h4 className="font-medium mb-2">Expanded Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed insights for artists to understand their support base and optimize their creative focus
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur p-4 rounded-lg">
                <Share2 className="text-primary h-6 w-6 mb-2" />
                <h4 className="font-medium mb-2">Community Features</h4>
                <p className="text-sm text-muted-foreground">
                  Enhanced interaction between artists and collectors to strengthen relationships
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur p-4 rounded-lg">
                <Coins className="text-primary h-6 w-6 mb-2" />
                <h4 className="font-medium mb-2">Extended Token Utility</h4>
                <p className="text-sm text-muted-foreground">
                  Additional use cases for $B3TR tokens to further incentivize collector participation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="text-center bg-card rounded-xl shadow-lg p-8 border border-border">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Whether you're an artist seeking sustainable support or a collector looking to make a real 
            difference in the creative world, VeCollab welcomes you to our community. Together, we can 
            transform how independent art is valued and supported.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
            >
              Verify Your World of V Art
            </a>
            <a 
              href="/explore"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-medium"
            >
              Explore Verified Art
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;