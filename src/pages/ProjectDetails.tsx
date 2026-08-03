import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle, Calendar, Clock, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteHead from "@/components/RouteHead";
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import { Reveal, RevealMask, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";
import { toast } from "@/hooks/use-toast";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EnquiryForm from "@/components/EnquiryForm";

const CONTACT_PHONE = "+91 9773552334";
const WHATSAPP_NUMBER = "919773552334";
const CONTACT_EMAIL = "sales@lionvestrealty.com";
const OFFICE_ADDRESS =
  "Plus Offices, 1st Floor, Landmark Cyber Park, Sector 67, Gurugram, HR 122101";


/** Editorial section header — display serif heading with a hairline rule. */
const SectionHeading = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-4 mb-8">
    <h2 className="font-display text-3xl md:text-4xl text-lion-black leading-tight">{children}</h2>
    <span className="eyebrow no-rule shrink-0 hidden sm:block">{eyebrow}</span>
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const [cooldown, setCooldown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const project = useMemo(() => projectsData.find((p) => p.id === id) ?? null, [id]);

  const createFormattedEmail = () => {
    if (!project) return "";

    const subject = `Inquiry about ${project.propertyName}`;
    const body = `
Hello,

I am interested in the property: ${project.propertyName} located at ${project.location}.

Please contact me regarding this property.

Additional details:
- Name: [Your Name]
- Phone Number: [Your Phone Number]
- Best time to call: [Best Time to Call]
- Additional Questions: [Any Additional Questions]

Thank you,
[Your Name]
    `.trim();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (!isMobileDevice) {
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleContact = (type: string, value: string) => {
    if (type === "phone") {
      window.location.href = `tel:${value}`;
      toast({ title: "Calling...", description: `Dialing ${value}` });
      setDialogOpen(false);
    } else if (type === "email") {
      window.location.href = createFormattedEmail();
      toast({
        title: "Opening email client",
        description: `Composing email about ${project?.propertyName}`,
      });
      setDialogOpen(false);
    } else if (type === "schedule") {
      setDialogOpen(true);
    }
  };

  const handleScheduleVisit = () => {
    if (cooldown) return;
    setCooldown(true);
    setDialogOpen(true);
    setTimeout(() => setCooldown(false), 5000);
  };

  if (!project) {
    return (
      <PageTransition className="bg-lion-paper min-h-screen">
        <RouteHead
          title="Listing Unavailable — Lionvest Realty"
          description="This listing is no longer available. Browse current residential and commercial projects with Lionvest Realty across Delhi NCR."
          path="/project"
          noindex
        />
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative min-h-[85vh] flex items-center bg-lion-obsidian overflow-hidden focus:outline-none"
        >
          <div className="grain absolute inset-0" />
          <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl py-32">
            <span className="eyebrow text-lion-lightgold mb-8">Listing unavailable</span>
            <h1 className="font-display text-display-sm text-white max-w-[16ch]">
              This project isn't on our books.
            </h1>
            <p className="text-white/60 max-w-md mt-6 leading-relaxed">
              The listing you were looking for doesn't exist or has since been withdrawn. Our
              current addresses are all here.
            </p>
            <div className="mt-12 border-t border-white/15 pt-8">
              <a href="/#projects" className="btn-editorial btn-gold">
                <span>Browse Projects</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  const projectImages = [...(project.images ?? [])];
  if (projectImages.length === 0) {
    if (project.heroImage) projectImages.push(project.heroImage);
    if (project.image && project.image !== project.heroImage) projectImages.push(project.image);
  }

  const related = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <PageTransition className="bg-lion-paper min-h-screen">
      <RouteHead
        title={`${project.propertyName} in ${project.location} — Lionvest Realty`}
        description={`Explore ${project.propertyName} by ${project.developerName} in ${project.location}. Get pricing, floor plans and expert guidance from Lionvest Realty across Gurgaon & Delhi NCR.`.slice(
          0,
          158
        )}
        path={`/project/${project.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Residence",
          name: project.propertyName,
          description: project.longDescription || project.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: project.location,
            addressCountry: "IN",
          },
          url: `https://lionvestrealty.com/project/${project.id}`,
          brand: { "@type": "Organization", name: project.developerName },
        }}
      />

      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <motion.div
        id="main-content"
        tabIndex={-1}
        className="relative h-[68vh] min-h-[460px] w-full bg-lion-obsidian overflow-hidden focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <ImageWithFallback
          src={project.heroImage || project.image}
          alt={project.propertyName}
          fallbackLabel={project.propertyName}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lion-obsidian via-lion-obsidian/65 to-lion-obsidian/25" />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl h-full flex flex-col justify-end pb-14">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
              <li>
                <Link to="/" className="hover:text-lion-gold transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/#projects" className="hover:text-lion-gold transition-colors">
                  Projects
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-lion-lightgold normal-case tracking-[0.12em]">
                {project.propertyName}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="eyebrow no-rule text-lion-lightgold">{project.developerName}</span>
            {project.isNew && (
              <span className="bg-lion-gold text-lion-black text-[0.6rem] uppercase tracking-[0.22em] px-3 py-1.5">
                New Launch
              </span>
            )}
            {project.isFeatured && !project.isNew && (
              <span className="bg-white/10 text-white text-[0.6rem] uppercase tracking-[0.22em] px-3 py-1.5">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-display text-display-sm text-white max-w-[20ch] leading-[0.98]">
            {project.propertyName}
          </h1>

          <div className="flex items-center text-white/70 mt-5 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-lion-gold" strokeWidth={1.5} />
            {project.location}
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <div className="container mx-auto px-6 md:px-8 max-w-7xl py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <SectionHeading eyebrow="Overview">Description</SectionHeading>
              <p className="text-lion-ink/75 text-base md:text-lg leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </Reveal>

            {projectImages.length > 0 && (
              <Reveal>
                <SectionHeading eyebrow="Imagery">Gallery</SectionHeading>
                <Carousel className="w-full">
                  <CarouselContent>
                    {projectImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="media-frame aspect-video">
                          <ImageWithFallback
                            src={image}
                            alt={`${project.propertyName} — image ${index + 1}`}
                            fallbackLabel={project.propertyName}
                            loading={index === 0 ? "eager" : "lazy"}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 bg-lion-obsidian/70 border-white/20 text-white hover:bg-lion-gold hover:text-lion-black" />
                  <CarouselNext className="right-3 bg-lion-obsidian/70 border-white/20 text-white hover:bg-lion-gold hover:text-lion-black" />
                </Carousel>
              </Reveal>
            )}

            {project.specifications && (
              <Reveal>
                <SectionHeading eyebrow="Details">Specifications</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="border-t border-black/10 pt-4">
                      <h3 className="text-[0.65rem] uppercase tracking-[0.22em] text-lion-gold mb-3 capitalize">
                        {key}
                      </h3>
                      <div className="text-lion-ink/75 text-sm leading-relaxed">
                        {Array.isArray(value) ? (
                          <ul className="space-y-1.5">
                            {value.map((item, index) => (
                              <li key={index}>{String(item)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{String(value)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {project.amenities && project.amenities.length > 0 && (
              <Reveal>
                <SectionHeading eyebrow="On site">Amenities</SectionHeading>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 p-3.5 bg-lion-ivory border border-black/5 hover:border-lion-gold/40 transition-colors duration-300"
                    >
                      <CheckCircle className="h-4 w-4 text-lion-gold flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-lion-ink/80 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 z-10 bg-white border border-black/10">
              <div className="bg-lion-obsidian p-6 relative overflow-hidden">
                <div className="grain absolute inset-0" />
                <h2 className="relative z-10 font-display text-2xl text-white leading-tight">
                  Interested in this address?
                </h2>
                <p className="relative z-10 text-white/55 text-sm mt-2">
                  Speak to our advisory team directly.
                </p>
              </div>

              <div className="p-6 space-y-1">
                <button
                  type="button"
                  onClick={() => handleContact("phone", CONTACT_PHONE)}
                  className="w-full text-left flex items-start gap-3 p-3 hover:bg-lion-ivory transition-colors"
                >
                  <Phone className="w-4 h-4 text-lion-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span className="block">
                    <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-lion-stone">
                      Phone
                    </span>
                    <span className="block text-lion-black text-sm mt-1">{CONTACT_PHONE}</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleContact("email", CONTACT_EMAIL)}
                  className="w-full text-left flex items-start gap-3 p-3 hover:bg-lion-ivory transition-colors"
                >
                  <Mail className="w-4 h-4 text-lion-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span className="block">
                    <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-lion-stone">
                      Email
                    </span>
                    <span className="block text-lion-black text-sm mt-1 break-all">{CONTACT_EMAIL}</span>
                  </span>
                </button>

                <div className="flex items-start gap-3 p-3">
                  <MapPin className="w-4 h-4 text-lion-gold flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-lion-stone">Office</p>
                    <p className="text-lion-ink/75 text-sm mt-1 leading-relaxed">{OFFICE_ADDRESS}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full bg-lion-gold hover:bg-lion-darkgold text-lion-black rounded-none h-12 text-[0.7rem] uppercase tracking-[0.22em] disabled:bg-black/20"
                    onClick={handleScheduleVisit}
                    disabled={cooldown}
                  >
                    {cooldown ? (
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Please wait...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule a Visit
                      </span>
                    )}
                  </Button>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi Lionvest Realty, I'd like details about ${project.propertyName} in ${project.location}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 flex items-center justify-center gap-2 border border-black/15 text-lion-black text-[0.7rem] uppercase tracking-[0.22em] hover:border-lion-gold hover:text-lion-gold transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp us
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-black/10 bg-lion-ivory p-6">
              <h3 className="font-display text-2xl text-lion-black leading-tight">
                Request details
              </h3>
              <p className="text-lion-stone text-sm mt-2 mb-6">
                Pricing, floor plans and availability — sent to you directly.
              </p>
              <EnquiryForm
                tone="light"
                projectId={project.id}
                projectName={project.propertyName}
              />
            </div>
          </aside>

        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-lion-paper2 py-20 md:py-28 border-t border-black/10">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <div className="mb-12">
              <span className="eyebrow mb-6">Also worth seeing</span>
              <h2 className="font-display text-display-sm text-lion-black max-w-[16ch]">
                <RevealMask>Other addresses</RevealMask>
              </h2>
            </div>

            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.09}>
              {related.map((item) => (
                <StaggerItem key={item.id}>
                  <Link to={`/project/${item.id}`} className="group block">
                    <div className="media-frame media-zoom h-[260px]">
                      <ImageWithFallback
                        src={item.heroImage || item.images?.[0] || item.image}
                        alt={item.propertyName}
                        fallbackLabel={item.propertyName}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="border-t border-black/15 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold">
                      <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">
                        {item.developerName}
                      </span>
                      <h3 className="font-display text-xl text-lion-black mt-2 leading-tight">
                        {item.propertyName}
                      </h3>
                      <p className="text-lion-stone text-xs uppercase tracking-[0.18em] mt-2">
                        {item.location}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Schedule a Visit</DialogTitle>
            <DialogDescription>
              Choose how you would like to be contacted for scheduling a visit to{" "}
              {project.propertyName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={() => handleContact("phone", CONTACT_PHONE)}
              className="flex items-center justify-center gap-2 bg-lion-gold hover:bg-lion-darkgold text-lion-black"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              onClick={() => handleContact("email", CONTACT_EMAIL)}
              className="flex items-center justify-center gap-2 bg-lion-gold hover:bg-lion-darkgold text-lion-black"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </PageTransition>
  );
};

export default ProjectDetails;
