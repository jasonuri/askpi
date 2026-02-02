import { Button } from "./ui/button";
import { Input } from "./ui/input";
import uriLogo from 'figma:asset/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.webp';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Link } from 'react-router-dom';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e1b246ca/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Subscription error:', data);
        toast.error(data.error || 'Failed to subscribe. Please try again.');
        return;
      }

      toast.success('Thanks for subscribing! We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full px-4 py-12 bg-[#1f1f1f] border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={uriLogo} alt="Uri" className="h-10 w-auto" />
            </div>
            <p className="text-white/80 text-lg">
              AI-powered focus groups that help you understand your audience and test your ideas before you launch. Make better decisions faster.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Product</h4>
            <div className="space-y-2 text-base">
              <a href="/#features" className="block text-white/70 hover:text-primary transition-colors">Features</a>
              <a href="/#features" className="block text-white/70 hover:text-primary transition-colors">How it Works</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Company</h4>
            <div className="space-y-2 text-base">
              <Link to="/about" className="block text-white/70 hover:text-primary transition-colors">About</Link>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Stay Updated</h4>
            <p className="text-white/70 text-base">
              Get the latest insights on AI-powered audience research and product updates.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
              />
              <Button 
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="w-full bg-primary text-black hover:bg-primary/90 px-6 py-2 h-auto font-medium text-base text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            <p className="text-white/50 text-sm">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-base text-white/60">
            © 2025 Uri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}