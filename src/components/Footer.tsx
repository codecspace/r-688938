import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StaggerGroup, StaggerItem } from "@/components/layout/Reveal";

const emailSchema = z.string().trim().email().max(255);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Check that email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    // Stored alongside enquiries so no interest is lost to a mail client that never opens.
    const { error } = await supabase.from("enquiries").insert({
      name: "Newsletter subscriber",
      phone: "not provided",
      email: parsed.data,
      message: "Requested to receive property updates.",
      source_path: "/footer-newsletter",
    });
    setSending(false);

    if (error) {
      toast({
        title: "Couldn't subscribe",
        description: "Please try again, or write to sales@lionvestrealty.com.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "You're on the list", description: "We'll send new launches your way." });
    setEmail("");
  };

  return (
    <footer className="bg-lion-obsidian text-white relative overflow-hidden border-t border-white/10">
      <div className="grain absolute inset-0 opacity-50" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl py-20 md:py-24 relative z-10">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10" stagger={0.09}>
          <StaggerItem className="lg:col-span-4">
            <img
              src="/lionvest-logo.png"
              alt="Lionvest Realty"
              width={197}
              height={221}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto mb-7"
            />

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
              <li><a href="/#team" className="link-rule hover:text-lion-gold transition-colors">Team</a></li>
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
                disabled={sending}
                className="text-[0.62rem] uppercase tracking-[0.25em] text-lion-gold hover:text-lion-lightgold transition-colors pl-4 disabled:opacity-50"
              >
                {sending ? "Sending" : "Send"}
              </button>
            </form>
            <p className="text-white/30 text-[0.68rem] mt-4 leading-relaxed">
              New launches and market notes. No spam, unsubscribe any time.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <div className="border-t border-white/10 mt-16 pt-8">
          <p className="text-white/25 text-[0.68rem] leading-relaxed max-w-4xl">
            Disclaimer: Lionvest Realty is a channel partner and not the developer of the projects
            listed. All images, layouts, plans, specifications and prices shown are indicative,
            provided by the respective developers, and are subject to change without notice. Nothing
            here constitutes an offer or contract. Buyers are advised to verify project details and
            RERA registration with the respective developer and the relevant state RERA authority
            before making any purchase decision.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/35 text-xs tracking-wide">
            <p>&copy; {new Date().getFullYear()} Lionvest Realty Pvt. Ltd. All rights reserved.</p>
            <Link to="/privacy-policy" className="link-rule hover:text-lion-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
