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

    toast({ title: "Subscription successful!", description: "Thank you for subscribing to our newsletter" });
    setEmail("");
  };

  return (
    <footer className="bg-lion-obsidian text-white relative overflow-hidden border-t border-white/10">
      <div className="grain absolute inset-0 opacity-50" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl py-20 md:py-24 relative z-10">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10" stagger={0.09}>
          <StaggerItem className="lg:col-span-4">
            <img src="https://i.imgur.com/ku5rlCk.jpg" alt="Lionvest Realty" className="h-9 mb-7" />
            <p className="font-display text-2xl leading-snug text-white/85 max-w-sm">
              Seamless support for every real estate query — residential and commercial —
              across Delhi, Noida and Gurugram.
            </p>
          </StaggerItem>

          <StaggerItem className="lg:col-span-3">
            <h3 className="text-[0.62rem] uppercase tracking-[0.3em] text-lion-gold mb-6">Contact</h3>
            <ul className="space-y-4 text-white/50 text-sm leading-relaxed">
              <li className="flex gap-3">
                <MapPin className="text-lion-gold h-4 w-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Plus Offices, 1st Floor, Landmark Cyber Park, Sector 67, Gurugram, HR 122101</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-lion-gold h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+919773552334" className="hover:text-lion-gold transition-colors">+91 97735 52334</a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-lion-gold h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:sales@lionvestrealty.com" className="hover:text-lion-gold transition-colors break-all">
                  sales@lionvestrealty.com
                </a>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h3 className="text-[0.62rem] uppercase tracking-[0.3em] text-lion-gold mb-6">Navigate</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li><Link to="/" className="link-rule hover:text-lion-gold transition-colors">Home</Link></li>
              <li><a href="/#about" className="link-rule hover:text-lion-gold transition-colors">About</a></li>
              <li><a href="/#projects" className="link-rule hover:text-lion-gold transition-colors">Projects</a></li>
              <li><a href="/#contact" className="link-rule hover:text-lion-gold transition-colors">Contact</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-3">
            <h3 className="text-[0.62rem] uppercase tracking-[0.3em] text-lion-gold mb-6">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex border-b border-white/20 focus-within:border-lion-gold transition-colors">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="bg-transparent py-3 outline-none flex-1 text-white text-sm placeholder:text-white/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="text-[0.62rem] uppercase tracking-[0.25em] text-lion-gold hover:text-lion-lightgold transition-colors pl-4"
              >
                Send
              </button>
            </form>

            <div className="flex gap-3 mt-8">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 flex items-center justify-center hover:bg-lion-gold hover:border-lion-gold hover:text-lion-black transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/35 text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} Lionvest Realty Pvt. Ltd. All rights reserved.</p>
          <Link to="/privacy-policy" className="link-rule hover:text-lion-gold transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
