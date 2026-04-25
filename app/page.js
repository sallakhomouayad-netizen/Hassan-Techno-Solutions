import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero-section/Hero";

const AboutUs = dynamic(() => import("@/components/aboutUs/AboutUS"));
const ProjectComp = dynamic(() => import("@/components/projectComp/ProjectComp"));
const Solutions = dynamic(() => import("@/components/solutions/SolutionsCom"));
const StatsKey = dynamic(() => import("@/components/statsKey/StatsKey"));
const OurPartners = dynamic(() => import("@/components/ourPartners/OurPartners"));
const Industries = dynamic(() => import("@/components/industriesCom/Industries"));
const Credibility = dynamic(() => import("@/components/credibility/Credibility"));
const Questions = dynamic(() => import("@/components/questions/Questions"));
const ContactSection = dynamic(() => import("@/components/contactSection/ContactSection"));
const Footer = dynamic(() => import("@/components/footer/Footer"));

export const metadata = {
  title: "Techno Solutions",
  description:
    "Techno Solutions delivers digital solutions, technology services, and scalable business-focused products.",
};

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section aria-label="Hero section">
          <Hero />
        </section>

        <section aria-label="About us section">
          <AboutUs />
        </section>

        <section aria-label="Projects section">
          <ProjectComp />
        </section>

        <section aria-label="Solutions section">
          <Solutions />
        </section>

        <section aria-label="Key statistics section">
          <StatsKey />
        </section>

        <section aria-label="Partners section">
          <OurPartners />
        </section>

        <section aria-label="Industries section">
          <Industries />
        </section>

        <section aria-label="Credibility section">
          <Credibility />
        </section>

        <section aria-label="Frequently asked questions section">
          <Questions />
        </section>

        <section aria-label="Contact section">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </>
  );
}