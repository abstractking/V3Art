import { FC } from 'react';
import { Link } from 'wouter';
import Logo from '@/components/ui/logo';
import { Twitter, Github, MessageSquare } from 'lucide-react';

const Footer: FC = () => {
  const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'VeChain Docs', href: 'https://docs.vechain.org/' },
    { name: 'Artist Guide', href: '#' },
    { name: 'Collector Guide', href: '#' },
    { name: 'FAQ', href: '#' },
  ];

  const companyLinks = [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Terms & Privacy', href: '#' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold text-white">VeCollab</h3>
                <p className="text-xs text-neutral-500">Supporting Independent Artists</p>
              </div>
            </div>
            <p className="mt-4 text-sm">
              Our platform connects digital artists with collectors through the power of VeChain blockchain technology, 
              ensuring authenticity and secure ownership of every artwork.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">Discord</span>
                <MessageSquare className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href}>
                      <span className="text-neutral-400 hover:text-neutral-300 text-sm cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  ) : (
                    <a href={link.href} className="text-neutral-400 hover:text-neutral-300 text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href}>
                      <span className="text-neutral-400 hover:text-neutral-300 text-sm cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  ) : (
                    <a href={link.href} className="text-neutral-400 hover:text-neutral-300 text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} VeChain Art Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
