import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { SectionLink } from "@/components/section-link";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { SECTION_IDS } from "@/lib/sections";
import { containerPx } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/site-logo";

const navLinks = [
  { sectionId: SECTION_IDS.partners, label: "Parceiros" },
  { sectionId: SECTION_IDS.about, label: "Sobre" },
  { sectionId: SECTION_IDS.services, label: "Serviços" },
  { sectionId: SECTION_IDS.process, label: "Processos" },
  { sectionId: SECTION_IDS.projects, label: "Projetos" },
  { sectionId: SECTION_IDS.team, label: "Equipe" },
  { sectionId: SECTION_IDS.articles, label: "Artigos" },
  { sectionId: SECTION_IDS.contact, label: "Contato" },
] as const;

const mobileNavVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

function NavbarCta({
  className,
  fullWidth,
  onNavigate,
}: {
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Button asChild className={cn(className, fullWidth && "w-full")}>
      <Link
        to={{ pathname: "/", hash: SECTION_IDS.contact }}
        onClick={onNavigate}
      >
        Falar com um engenheiro
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </Button>
  );
}

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();
  const isStandalonePage =
    location.pathname.startsWith("/articles") ||
    location.pathname.startsWith("/projects");
  const hasSolidBackground = isScrolled || isStandalonePage;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "navbar fixed inset-x-0 top-0 z-[1000] border-b transition-all duration-300 ease-out",
          hasSolidBackground
            ? "border-white/10 bg-black/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "flex h-[60px] items-center justify-between gap-3 md:h-[68px]",
            containerPx,
          )}
        >
          <Link
            to="/"
            className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
            aria-label="ADP Engenharia — início"
            onClick={closeMenu}
          >
            <SiteLogo className="size-8 shrink-0 object-contain sm:size-9" />
            <span className="truncate font-display text-base font-semibold text-white sm:text-lg">
              ADP Engenharia
            </span>
          </Link>

          <LayoutGroup id="navbar">
            <nav
              className="navbar__links hidden items-center gap-6 lg:flex xl:gap-7"
              aria-label="Navegação principal"
            >
              {navLinks.map(({ sectionId, label }) => (
                <SectionLink
                  key={sectionId}
                  sectionId={sectionId}
                  label={label}
                  variant="navbar"
                  isActive={activeSection === sectionId}
                />
              ))}
              <NavbarCta />
            </nav>
          </LayoutGroup>

          <Button
            type="button"
            variant="icon-ghost"
            size="none"
            className="lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[1001] bg-black/95 backdrop-blur-xl lg:hidden"
            aria-label="Navegação mobile"
          >
            <div className={cn("flex h-full flex-col", containerPx)}>
              <div className="flex h-[60px] shrink-0 items-center justify-end md:h-[68px]">
                <Button
                  type="button"
                  variant="icon-ghost"
                  size="none"
                  aria-label="Fechar menu"
                  onClick={closeMenu}
                >
                  <X className="size-6" aria-hidden />
                </Button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col justify-center pb-16"
                variants={mobileNavVariants}
                initial="hidden"
                animate="visible"
              >
                <ul className="flex flex-col">
                  {navLinks.map(({ sectionId, label }) => (
                    <motion.li key={sectionId} variants={mobileNavItemVariants}>
                      <SectionLink
                        sectionId={sectionId}
                        label={label}
                        variant="mobile"
                        isActive={activeSection === sectionId}
                        onNavigate={closeMenu}
                        className="block py-5 text-2xl"
                      />
                    </motion.li>
                  ))}
                  <motion.li variants={mobileNavItemVariants} className="pt-6">
                    <NavbarCta fullWidth onNavigate={closeMenu} />
                  </motion.li>
                </ul>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
