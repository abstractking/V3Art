import { FC } from 'react';
import { Share2, Shield, Droplets, Coins, Heart, BarChart3, Globe, Users } from 'lucide-react';

const About: FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About VeCollab</h1>
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
            art ownership and connects artists the funding they need to flourish.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Our Vision</h3>
            <p className="italic">
              "A world where independent artists can sustain themselves through their creativity, supported by a 
              community of collectors who directly contribute to their ongoing success."
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default About;