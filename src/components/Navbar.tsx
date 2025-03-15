
import { Menu, Phone } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  return (
    <nav className="absolute w-full z-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <a href="/" className="flex items-center">
            <img 
              src="https://imgur.com/a/7ljVewQ.jpg" 
              alt="Lionvest Realty" 
              className="h-12 mr-3"
            />
            <span className="text-2xl font-display text-white">Lionvest Realty</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-lion-gold transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-lion-gold transition-colors">About Company</a>
            <a href="#projects" className="text-white hover:text-lion-gold transition-colors">Projects</a>
            <a href="#contact" className="text-white hover:text-lion-gold transition-colors">Contact Us</a>
            <div className="flex items-center text-lion-gold">
              <Phone className="w-4 h-4 mr-2" />
              <span>9773552334</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <a href="tel:9773552334" className="text-lion-gold mr-4 flex items-center">
              <Phone className="w-5 h-5" />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-8">
                  <a href="#home" className="text-lg border-b border-lion-lightgray pb-2">Home</a>
                  <a href="#about" className="text-lg border-b border-lion-lightgray pb-2">About Company</a>
                  <a href="#projects" className="text-lg border-b border-lion-lightgray pb-2">Projects</a>
                  <a href="#contact" className="text-lg border-b border-lion-lightgray pb-2">Contact Us</a>
                  <div className="flex items-center text-lion-gold pt-4">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>9773552334</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
