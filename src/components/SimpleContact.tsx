import { Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import EnquiryForm from "@/components/EnquiryForm";
import { useSiteContent } from "@/context/SiteContentContext";

type ContactType = "phone" | "email" | "whatsapp";

const SimpleContact = () => {
  const { content } = useSiteContent();
  const contact = content.contact;
  const PHONE_DISPLAY = contact.phoneDisplay;
  const PHONE_TEL = contact.phoneTel;
  const WHATSAPP = contact.whatsapp;
  const EMAIL = contact.email;

  const handleContactAction = (type: ContactType) => {
    if (type === "phone") {
      window.location.href = `tel:${PHONE_TEL}`;

      return;
    }

    if (type === "whatsapp") {
      const text = "Hi Lionvest Realty, I'd like to know more about your properties.";
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      return;
    }

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const subject = "Inquiry from Lionvest Realty Website";
    const body = "Hi, I'm interested in knowing more about your services.";

    if (!isMobileDevice) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    navigator.clipboard?.writeText(EMAIL).catch(() => undefined);
    toast({
      title: "Email address copied",
      description: `If your mail app didn't open, write to ${EMAIL}.`,
    });
  };

  return (
    <section id="contact" className="relative bg-lion-obsidian py-28 md:py-40 overflow-hidden">
      <div className="grain absolute inset-0" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-6">
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

            <Reveal delay={0.15} className="border-t border-white/15 mt-12">
              <button
                onClick={() => handleContactAction("phone")}
                className="group w-full flex items-center justify-between gap-6 border-b border-white/15 py-6 text-left"
              >
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-2">Call</span>
                  <span className="font-display text-2xl text-white group-hover:text-lion-lightgold transition-colors">
                    {PHONE_DISPLAY}
                  </span>
                </span>
                <Phone className="w-5 h-5 text-lion-gold shrink-0" strokeWidth={1.25} />
              </button>

              <button
                onClick={() => handleContactAction("whatsapp")}
                className="group w-full flex items-center justify-between gap-6 border-b border-white/15 py-6 text-left"
              >
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-2">WhatsApp</span>
                  <span className="font-display text-2xl text-white group-hover:text-lion-lightgold transition-colors">
                    Message us directly
                  </span>
                </span>
                <MessageCircle className="w-5 h-5 text-lion-gold shrink-0" strokeWidth={1.25} />
              </button>

              <button
                onClick={() => handleContactAction("email")}
                className="group w-full flex items-center justify-between gap-6 border-b border-white/15 py-6 text-left"
              >
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-white/40 mb-2">Email</span>
                  <span className="font-display text-xl md:text-2xl text-white group-hover:text-lion-lightgold transition-colors break-all">
                    {EMAIL}
                  </span>
                </span>
                <Mail className="w-5 h-5 text-lion-gold shrink-0" strokeWidth={1.25} />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-6 w-full">
            <Reveal delay={0.2}>
              <div className="border border-white/12 bg-white/[0.03] p-7 md:p-9">
                <h3 className="font-display text-3xl text-white leading-tight">Send an enquiry</h3>
                <p className="text-white/45 text-sm mt-2 mb-8">
                  Leave your details and an advisor will call you back.
                </p>
                <EnquiryForm tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContact;
