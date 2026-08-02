import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteHead from "@/components/RouteHead";
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import { Reveal, RevealMask } from "@/components/layout/Reveal";

interface PolicySection {
  id: string;
  title: string;
  body: string;
}

const INTRO =
  'This Privacy Policy governs how Lionvest Realty collects, uses, maintains, and discloses information from users ("User") of the website ("Site"). This policy applies to the Site and all products and services offered by Lionvest Realty.';

const SECTIONS: PolicySection[] = [
  {
    id: "personal-information",
    title: "Personal Identification Information",
    body: "We may collect personal identification information from Users through various interactions on our Site. While Users can visit the Site anonymously, personal data is only collected when voluntarily submitted. Refusing to provide personal information may limit access to certain features of the Site.",
  },
  {
    id: "non-personal-information",
    title: "Non-Personal Identification Information",
    body: "We also collect non-personal identification information whenever Users interact with our Site. This may include details such as browser type, device information, operating system, and internet service provider. This data is used to help improve the overall experience.",
  },
  {
    id: "cookies",
    title: "Web Browser Cookies",
    body: 'Our Site may use "cookies" to enhance User experience. Cookies are placed on your device for record-keeping and to track certain information about your visit. Users can set their browser to refuse cookies or alert them when cookies are sent; however, some parts of the Site may not function properly if cookies are disabled.',
  },
  {
    id: "project-images",
    title: "Use of Project Images",
    body: "In addition to textual content, our Site displays images of the projects we are selling. These images are used solely for informational and marketing purposes. Lionvest Realty does not claim ownership of images provided by third parties, and any such images are subject to the original source's rights.",
  },
  {
    id: "data-protection",
    title: "Protection of Your Information",
    body: "We implement appropriate data collection, storage, and processing practices along with security measures to safeguard personal information, including usernames, passwords, and transaction details, from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    id: "sharing-information",
    title: "Sharing Your Personal Information",
    body: "Lionvest Realty does not sell, trade, or rent Users' personal identification information to others. We may share aggregated demographic data not linked to any personal identification information with business partners, trusted affiliates, and advertisers for analytical and marketing purposes.",
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    body: "Lionvest Realty reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with a revised updated date. Users are encouraged to check this policy periodically to stay informed of any modifications.",
  },
  {
    id: "acceptance",
    title: "Acceptance of These Terms",
    body: "By using this Site, you acknowledge and accept this Privacy Policy. If you do not agree with this policy, please do not use our Site. Continued use of the Site after any changes signifies your acceptance of those changes.",
  },
];

const PrivacyPolicy = () => {
  const updated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageTransition className="bg-transparent min-h-screen">
      <RouteHead
        title="Privacy Policy — Lionvest Realty"
        description="Learn how Lionvest Realty collects, uses, and safeguards your personal information when you browse properties and services across Gurgaon and Delhi NCR."
        path="/privacy-policy"
      />
      <ScrollProgress />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Dark header band — keeps the transparent navbar legible at the top of the page */}
        <section className="relative bg-lion-obsidian overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
          <div className="grain absolute inset-0" />
          <div className="absolute -top-40 -right-24 w-[32rem] h-[32rem] rounded-full bg-lion-gold/10 blur-3xl" />

          <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl">
            <span className="eyebrow text-lion-lightgold mb-6">Legal</span>
            <h1 className="font-display text-display-sm text-white">
              <RevealMask>Privacy Policy</RevealMask>
            </h1>
            <p className="text-white/55 text-sm md:text-base mt-6 max-w-lg leading-relaxed">
              How we collect, use and protect the information you share with Lionvest Realty.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-8 max-w-7xl py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Table of contents */}
            <nav aria-label="Privacy policy sections" className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <span className="eyebrow mb-6">Contents</span>
                <ul className="space-y-3 border-l border-white/10 pl-5">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-white/45 hover:text-lion-gold transition-colors leading-snug block"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Body */}
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-white/80/75 text-base md:text-lg leading-relaxed border-b border-white/10 pb-10">
                  {INTRO}
                </p>
              </Reveal>

              {SECTIONS.map((section, i) => (
                <Reveal key={section.id} delay={Math.min(i * 0.05, 0.3)}>
                  <article id={section.id} className="scroll-mt-28 pt-10">
                    <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-white/80/75 leading-relaxed">{section.body}</p>
                  </article>
                </Reveal>
              ))}

              <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-white/45 text-xs uppercase tracking-[0.18em]">
                  Last updated: {updated}
                </p>
                <a href="/#contact" className="link-rule text-sm text-white hover:text-lion-gold transition-colors">
                  Questions? Get in touch
                </a>
              </div>

              <Link to="/" className="link-rule text-sm text-white/45 hover:text-lion-gold transition-colors mt-8 inline-block">
                Return home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default PrivacyPolicy;
