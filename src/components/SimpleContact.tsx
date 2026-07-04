import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Reveal, RevealMask } from "@/components/layout/Reveal";
import Magnetic from "@/components/layout/Magnetic";

type ContactType = "phone" | "email";

const SimpleContact = () => {
  const handleContactAction = (type: ContactType) => {
    if (type === "phone") {
      window.location.href = "tel:+919773552334";
      toast({ title: "Dialing...", description: "Calling +91 97735 52334" });
    } else {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const subject = "Inquiry from Lionvest Realty Website";
      const body = "Hi, I'm interested in knowing more about your services.";

      if (!isMobileDevice) {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=sales@lionvestrealty.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          "_blank"
        );
      } else {
        window.location.href = `mailto:sales@lionvestrealty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      toast({ title: "Opening email client", description: "Composing email to sales@lionvestrealty.com" });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-lion-obsidian">
      <div className="grain absolute inset-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lion-gold/[0.08] filter blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
        <Reveal>
          <span className="eyebrow justify-center mb-4">Get In Touch</span>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.05] tracking-tight">
            <RevealMask>Let's Talk Property</RevealMask>
          </h3>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-14">
            Ready to learn more about our properties or have questions? Reach out to us directly.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col md:flex-row justify-center items-center gap-5">
          <Magnetic>
            <Button
              onClick={() => handleContactAction("phone")}
              className="bg-gradient-to-r from-lion-gold to-lion-darkgold hover:brightness-110 text-lion-black w-full md:w-auto py-6 px-9 text-base font-medium flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
              size="lg"
            >
              <Phone className="h-5 w-5" /> Call Us
            </Button>
          </Magnetic>

          <Magnetic>
            <Button
              onClick={() => handleContactAction("email")}
              variant="outline"
              className="border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white w-full md:w-auto py-6 px-9 text-base font-medium flex items-center justify-center gap-3 btn-glow"
              size="lg"
            >
              <Mail className="h-5 w-5" /> Email Us
            </Button>
          </Magnetic>
        </Reveal>
      </div>

      <motion.div
        className="gold-rule absolute bottom-0 left-0 right-0 origin-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
};

export default SimpleContact;
