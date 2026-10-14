import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import { useSiteContent } from "@/context/SiteContentContext";
import type { TeamMember } from "@/lib/siteContent";

type Member = TeamMember;


const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

const Team = () => {
  const { content } = useSiteContent();
  // Temporary public-only removal; keep saved content intact so undo restores the profile.
  const teamData = content.team.filter(
    (member) => !/^prem\s+mohan\s+singh$/i.test(member.name.trim()),
  );
  const teamSection = content.teamSection;
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
    <section id="team" className="bg-lion-paper py-24 md:py-36 border-t border-black/10">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 md:mb-20">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">{teamSection.eyebrow}</span>
          </Reveal>
          <div className="lg:col-span-8">
            <SplitHeading
              text={teamSection.heading}
              className="font-display text-display-sm text-lion-black max-w-[18ch]"
            />

          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-black/12 pt-12" stagger={0.12}>
          {teamData.map((member) => (
            <StaggerItem key={member.name}>
              <button
                onClick={() => openProfile(member)}
                className="group text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lion-gold focus-visible:ring-offset-4 focus-visible:ring-offset-lion-paper"
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

                <div className="border-t border-black/15 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold">
                  <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">{member.role}</span>
                  <h3 className="font-display text-2xl text-lion-black mt-2">{member.name}</h3>
                  <span className="link-rule text-[0.65rem] uppercase tracking-[0.25em] text-lion-stone mt-4 inline-block">
                    Read profile
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-lion-paper border-black/10 rounded-none max-h-[85vh] overflow-y-auto">
          {selectedMember && (
            <>
              <DialogHeader className="text-left">
                <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.3em]">
                  {selectedMember.role}
                </span>
                <DialogTitle className="font-display text-3xl md:text-4xl text-lion-black font-normal mt-2">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription className="sr-only">Profile of {selectedMember.name}</DialogDescription>
              </DialogHeader>

              <div className="border-t border-black/10 pt-6 space-y-4">
                {selectedMember.bio.split("\n\n").map((para, i) => (
                  <p key={i} className="text-lion-ink/75 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {(selectedMember.phoneNumber || selectedMember.email) && (
                <div className="border-t border-black/10 pt-6 flex flex-wrap gap-4">
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
