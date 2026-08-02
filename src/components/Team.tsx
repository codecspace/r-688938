import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";

interface Member {
  name: string;
  role: string;
  image: string | null;
  phoneNumber?: string;
  email?: string;
  bio: string;
}

const teamData: Member[] = [
  {
    name: "Prem Mohan Singh",
    role: "Director",
    image: "https://i.imgur.com/8U3fS8k.jpeg",
    phoneNumber: "+91 9773552334",
    email: "sales@lionvestrealty.com",
    bio: "After working at the Pan-India level as the director of sales and strategy, Prem Mohan Singh has played an important role in the trade expansion and investment plan. He is a graduate from Delhi university and MBA from NIRM in retail and marketing. Furthermore, he has a diploma in computer science and fashion designing. His immense and diversified experience with international firms in establishing strategic trade operations in India has further strengthened their ability to navigate complex markets and run high-value real estate investments.\n\nCurrently, he specializes in managing the investment portfolio for established entrepreneurs, offering real estate solutions that align with prolonged growth and money-making strategies. Under his leadership, Lionvest Realty Pvt. Ltd. continues to set new benchmarks in the success of trust, excellence, and investment in the Indian real estate sector.",
  },
  {
    name: "Vaibhav Gupta",
    role: "Director",
    image: null,
    bio: "With more than 12 years of experience in B2B and B2C sales, Vaibhav Gupta brings a strong strategic and out-operated approach to Lionvest Realty Private. An MBA graduate in Limited Sales and Marketing, he has created an impressive career in real estate and allied industries, holding major sales positions in famous multinational corporations such as Berger Paints, UltraTech Cement, and AkzoNobel India.\n\nHis expertise lies in sales strategy, market expansion, and business growth, making him a valuable leader in driving high-impact real estate transactions. With a deep understanding of consumer behavior, market trends, and investment dynamics, Vaibhav plays a crucial role in delivering tailored property solutions that align with client aspirations and long-term investment goals.",
  },
  {
    name: "Jazbi Fatema",
    role: "Marketing Head",
    image: null,
    bio: "Expert Senior Digital marketing Management Professional with 12+ years of insightful & broad experience in; Marketing Strategy, Branding, Digital Marketing, Ecommerce end to end Marketing, Marketing Communications, Google Analytics, Retail, Corporate Communication, Media Planning, Budgeting, Advertising, Social Media Marketing, Channel Marketing, Campaigns, Strategic Marketing, liaising with external and internal stakeholders to promote business product. Passionate about nurturing talent and building high performance teams that are built on a culture of trust and transparency, respect for individual.",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [open, setOpen] = useState(false);

  const openProfile = (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleContactClick = (type: "phone" | "email", value: string) => {
    if (type === "phone") {
      window.location.href = `tel:${value}`;
    } else {
      const subject = "General Inquiry for Lionvest Realty";
      const body = "Hello,\n\nI am interested in learning more about your properties.\n\nThank you.";
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      window.location.href = isMobileDevice
        ? `mailto:${value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        : `https://mail.google.com/mail/?view=cm&fs=1&to=${value}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    toast({
      title: `${type === "phone" ? "Calling" : "Emailing"} team member`,
      description: `${type === "phone" ? "Dialing" : "Opening email to"} ${value}`,
    });
  };

  return (
    <section id="team" className="bg-transparent py-24 md:py-36 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 md:mb-20">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">Leadership</span>
          </Reveal>
          <div className="lg:col-span-8">
            <SplitHeading
              text="The people you'll actually be working with."
              className="font-display text-display-sm text-white max-w-[18ch]"
            />
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-white/10 pt-12" stagger={0.12}>
          {teamData.map((member) => (
            <StaggerItem key={member.name}>
              <button
                onClick={() => openProfile(member)}
                className="group text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lion-gold focus-visible:ring-offset-4 focus-visible:ring-offset-lion-obsidian"
                aria-label={`View profile of ${member.name}`}
              >
                <div className="media-frame media-zoom h-[380px] md:h-[440px] bg-lion-obsidian">
                  {member.image ? (
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center grayscale-[35%] group-hover:grayscale-0 transition-[filter] duration-700"
                      loading="lazy"
                      decoding="async"
                      fallbackLabel={member.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lion-obsidian to-lion-darkgray">
                      <span className="font-display text-7xl text-lion-gold/70">{initials(member.name)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/12 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold">
                  <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">{member.role}</span>
                  <h3 className="font-display text-2xl text-white mt-2">{member.name}</h3>
                  <span className="link-rule text-[0.65rem] uppercase tracking-[0.25em] text-white/45 mt-4 inline-block">
                    Read profile
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-transparent border-white/10 rounded-none max-h-[85vh] overflow-y-auto">
          {selectedMember && (
            <>
              <DialogHeader className="text-left">
                <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.3em]">
                  {selectedMember.role}
                </span>
                <DialogTitle className="font-display text-3xl md:text-4xl text-white font-normal mt-2">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription className="sr-only">Profile of {selectedMember.name}</DialogDescription>
              </DialogHeader>

              <div className="border-t border-white/10 pt-6 space-y-4">
                {selectedMember.bio.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/80/75 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {(selectedMember.phoneNumber || selectedMember.email) && (
                <div className="border-t border-white/10 pt-6 flex flex-wrap gap-4">
                  {selectedMember.phoneNumber && (
                    <button
                      onClick={() => handleContactClick("phone", selectedMember.phoneNumber!)}
                      className="btn-editorial btn-ink"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4" strokeWidth={1.5} /> Call
                      </span>
                    </button>
                  )}
                  {selectedMember.email && (
                    <button
                      onClick={() => handleContactClick("email", selectedMember.email!)}
                      className="btn-editorial btn-gold"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" strokeWidth={1.5} /> Email
                      </span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Team;
