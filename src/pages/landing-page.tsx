import { Home } from "@/components/home";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Projects } from "@/components/projects";
import { Team } from "@/components/team";
import { Methodology } from "@/components/methodology";
import { ArticlesSection } from "@/components/articles";
import { ClientsMarquee } from "@/components/clients-marquee";
import { CtaFinal } from "@/components/cta-final";
import { Contact } from "@/components/contact";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { Footer } from "@/components/footer";

export function LandingPage() {
  useScrollToHash();

  return (
    <>
      <Home />
      <ClientsMarquee />
      <About />
      <Services />
      <Process />
      <Projects />
      <Team />
      <Methodology />
      <ArticlesSection />
      <CtaFinal />
      <Contact />
      <Footer />
    </>
  );
}
