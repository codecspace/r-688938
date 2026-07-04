import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { StaggerGroup, StaggerItem } from "@/components/layout/Reveal";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const subject = "New Newsletter Subscription";
    const body = `Please add this email to the newsletter: ${email}`.trim();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobileDevice) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=sales@lionvestrealty.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );
    } else {
      window.location.href = `mailto:sales@lionvestrealty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter",
    });
    setEmail("");
  };

  return (
    <footer className="bg-lion-obsidian text-white relative overflow-hidden">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="container mx-auto px-4 max-w-6xl py-20 relative z-10">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" stagger={0.1}>
          <StaggerItem>
            <img src="https://i.imgur.com/ku5rlCk.jpg" alt="Lionvest Realty" className="h-10 mb-6" />
            <p className="text-white/50 leading-relaxed">
              Formed with a vision to provide seamless support for every real estate
              query — residential and commercial — across Delhi, Noida, and Gurugram.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h3 className="font-display text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-white/50">
              <li className="flex gap-3">
                <MapPin className="text-lion-gold h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Plus Offices, 1st Floor, Landmark Cyber Park, Sector 67, Gurugram, HR 122101</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-lion-gold h-5 w-5 flex-shrink-0" />
                <a href="tel:+919773552334" className="hover:text-lion-gold transition-colors">+91 97735 52334</a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-lion-gold h-5 w-5 flex-shrink-0" />
                <a href="mailto:sales@lionvestrealty.com" className="hover:text-lion-gold transition-colors">sales@lionvestrealty.com</a>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="font-display text-lg mb-6 text-white">Important Links</h3>
            <ul className="space-y-3 text-white/50">
              <li><Link to="/" className="hover:text-lion-gold transition-colors">Home</Link></li>
              <li><a href="#about" className="hover:text-lion-gold transition-colors">About Company</a></li>
              <li><a href="#projects" className="hover:text-lion-gold transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-lion-gold transition-colors">Contact Us</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="font-display text-lg mb-6 text-white">Follow Us</h3>
            <div className="flex space-x-3 mb-8">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center hover:bg-lion-gold hover:border-lion-gold hover:text-lion-black transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <h4 className="text-sm font-semibold mb-3 text-white/70">Subscribe to our newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2.5 bg-white/5 border border-white/10 outline-none focus:border-lion-gold/50 rounded-l flex-1 text-white text-sm placeholder:text-white/30 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-lion-gold text-lion-black text-sm font-medium px-4 py-2.5 rounded-r hover:bg-lion-lightgold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </StaggerItem>
        </StaggerGroup>

        <div className="gold-rule my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} Lionvest Realty Pvt. Ltd. All Rights Reserved.</p>
          <Link to="/privacy-policy" className="hover:text-lion-gold transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
