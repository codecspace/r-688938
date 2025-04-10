
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter"
    });
    setEmail("");
  };

  return (
    <footer className="bg-lion-black text-white">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl mb-6">About Us</h3>
            <p className="text-gray-400 mb-6">
              Company formed with a vision to provide seamless support to all real estate queries related to buying of residence and commercial properties in and around Delhi noida gurgaon regions.
            </p>
            <img 
              src="https://imgur.com/ku5rlCk.jpg" 
              alt="Lionvest Realty" 
              className="h-12"
            />
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex">
                <MapPin className="text-lion-gold mr-3 h-5 w-5 flex-shrink-0" />
                <span>Plus offices, 1st floor, landmark Cyber Park, Sector 67, Gurgaon. HR 122101</span>
              </li>
              <li className="flex">
                <Phone className="text-lion-gold mr-3 h-5 w-5 flex-shrink-0" />
                <span>9773552334</span>
              </li>
              <li className="flex">
                <Phone className="text-lion-gold mr-3 h-5 w-5 flex-shrink-0" />
                <span>9773552334</span>
              </li>
              <li className="flex">
                <Mail className="text-lion-gold mr-3 h-5 w-5 flex-shrink-0" />
                <span>sales@lionvestrealty.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-6">Important Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-lion-gold transition-colors">Home</Link>
              </li>
              <li>
                <a href="#about" className="hover:text-lion-gold transition-colors">About Company</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-lion-gold transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lion-gold transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-lion-darkgray rounded-full flex items-center justify-center hover:bg-lion-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-lion-darkgray rounded-full flex items-center justify-center hover:bg-lion-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-lion-darkgray rounded-full flex items-center justify-center hover:bg-lion-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-lion-darkgray rounded-full flex items-center justify-center hover:bg-lion-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-lion-darkgray border-none outline-none rounded-l flex-1 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-lion-gold text-black px-4 py-2 rounded-r hover:bg-lion-darkgold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-lion-darkgray mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>Copyright © {new Date().getFullYear()} Lionvest Realty Pvt Ltd. All Rights Reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="hover:text-lion-gold transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
