import { Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import Magnetic from "@/components/layout/Magnetic";

type ContactType = "phone" | "email";

const SimpleContact = () => {
  const handleContactAction = (type: ContactType) => {
    if (type === "phone") {
      window.location.href = "tel:+919773552334";
      toast({ title: "Dialing...", description: "Calling +91 97735 52334" });
      return;
    }

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
  };

  return (
    <section id="contact" className="relative bg-lion-obsidian py-28 md:py-40 overflow-hidden">
      <div className="grain absolute inset-0" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow mb-8">Get in touch</span>
            </Reveal>
            <SplitHeading
              text="Let's talk property."
              className="font-display text-display-lg text-white leading-[0.95]"
            />
            <Reveal delay={0.1}>
              <p className="text-white/55 text-lg mt-8 max-w-md leading-relaxed">
                Tell us what you're looking for and we'll come back with a shortlist worth
                your time — usually within a day.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 w-full">
            <Reveal delay={0.15} className="border-t border-white/15">
              <button
                onClick={() => handleContactAction("phone")}
                className="group w-full flex items-center justify-between gap-6 border-b border-white/15 py-7 text-left"
              >
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-2">Call</span>
                  <span className="font-display text-2xl md:text-3xl text-white group-hover:text-lion-lightgold transition-colors">
                    +91 97735 52334
                  </span>
                </span>
                <Phone className="w-5 h-5 text-lion-gold shrink-0" strokeWidth={1.25} />
              </button>

              <button
                onClick={() => handleContactAction("email")}
                className="group w-full flex items-center justify-between gap-6 border-b border-white/15 py-7 text-left"
              >
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-2">Email</span>
                  <span className="font-display text-2xl md:text-[1.75rem] text-white group-hover:text-lion-lightgold transition-colors break-all">
                    sales@lionvestrealty.com
                  </span>
                </span>
                <Mail className="w-5 h-5 text-lion-gold shrink-0" strokeWidth={1.25} />
              </button>

              <div className="pt-8">
                <Magnetic>
                  <button onClick={() => handleContactAction("email")} className="btn-editorial btn-gold w-full sm:w-auto">
                    <span>Start a conversation</span>
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContact;
