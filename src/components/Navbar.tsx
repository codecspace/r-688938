import { Menu, Phone, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/layout/Editorial";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    if (window.location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-lion-gold focus:text-lion-black focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>
      <nav
        className={`site-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-24"
            }`}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/lionvest-logo.png"
                alt="Lionvest Realty"
                width={197}
                height={221}
                decoding="async"
                className={`w-auto transition-all duration-500 ${scrolled ? "h-7" : "h-9"}`}
              />

              <span
                className={`font-display tracking-tight transition-all duration-500 ${
                  scrolled ? "text-lg text-lion-black" : "text-xl text-white"
                }`}
              >
                Lionvest Realty
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => go(link.id, e)}
                  className={`link-rule text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-lion-gold ${
                    scrolled ? "text-lion-ink/80" : "text-white/85"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+919773552334"
                className={`flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] border-l pl-8 transition-colors ${
                  scrolled ? "border-black/10 text-lion-black hover:text-lion-gold" : "border-white/20 text-lion-lightgold"
                }`}
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                97735 52334
              </a>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`md:hidden p-2 -mr-2 transition-colors ${scrolled ? "text-lion-black" : "text-white"}`}
            >
              <Menu className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen ink menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[60] bg-lion-obsidian md:hidden flex flex-col"
          >
            <div className="grain absolute inset-0" />
            <div className="relative z-10 flex items-center justify-between h-24 px-6">
              <span className="font-display text-xl text-white">Lionvest Realty</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-white">
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => go(link.id, e)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-5"
                >
                  <span className="index-num text-white/30">0{i + 1}</span>
                  <span className="font-display text-4xl text-white group-hover:text-lion-gold transition-colors">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="relative z-10 px-6 pb-12 space-y-2">
              <a href="tel:+919773552334" className="block text-lion-gold text-sm tracking-[0.15em]">
                +91 97735 52334
              </a>
              <a href="mailto:sales@lionvestrealty.com" className="block text-white/50 text-sm">
                sales@lionvestrealty.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
