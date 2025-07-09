
import { Menu, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to a section or navigate to home page section
  const scrollToSection = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // If we're on the home page, scroll to the section
    if (window.location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to the home page with the section hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'} transition-all duration-300`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img 
              src="https://imgur.com/ku5rlCk.jpg" 
              alt="Lionvest Realty" 
              className="h-12 mr-3"
            />
            <span className={`text-2xl font-display transition-colors duration-300 ${scrolled ? 'text-lion-black' : 'text-white'}`}>
              Lionvest Realty
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection("home", e)} 
              className={`transition-colors duration-300 hover:text-lion-gold ${scrolled ? 'text-lion-black' : 'text-white'}`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection("about", e)} 
              className={`transition-colors duration-300 hover:text-lion-gold ${scrolled ? 'text-lion-black' : 'text-white'}`}
            >
              About Company
            </a>
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection("projects", e)} 
              className={`transition-colors duration-300 hover:text-lion-gold ${scrolled ? 'text-lion-black' : 'text-white'}`}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection("contact", e)} 
              className={`transition-colors duration-300 hover:text-lion-gold ${scrolled ? 'text-lion-black' : 'text-white'}`}
            >
              Contact Us
            </a>
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`${scrolled ? 'text-lion-black hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-depth-card border-none">
                <div className="flex flex-col space-y-6 mt-12">
                  <a href="#home" onClick={(e) => scrollToSection("home", e)} className="text-lg border-b border-lion-lightgray pb-3 hover:text-lion-gold transition-colors">Home</a>
                  <a href="#about" onClick={(e) => scrollToSection("about", e)} className="text-lg border-b border-lion-lightgray pb-3 hover:text-lion-gold transition-colors">About Company</a>
                  <a href="#projects" onClick={(e) => scrollToSection("projects", e)} className="text-lg border-b border-lion-lightgray pb-3 hover:text-lion-gold transition-colors">Projects</a>
                  <a href="#contact" onClick={(e) => scrollToSection("contact", e)} className="text-lg border-b border-lion-lightgray pb-3 hover:text-lion-gold transition-colors">Contact Us</a>
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
