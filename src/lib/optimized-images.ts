import client01 from "@/assets/optimized/clients/1.webp";
import client02 from "@/assets/optimized/clients/2.webp";
import client03 from "@/assets/optimized/clients/3.webp";
import client04 from "@/assets/optimized/clients/4.webp";
import client05 from "@/assets/optimized/clients/5.webp";
import client06 from "@/assets/optimized/clients/6.webp";
import client07 from "@/assets/optimized/clients/7.webp";
import client08 from "@/assets/optimized/clients/8.webp";
import client09 from "@/assets/optimized/clients/9.webp";
import logo72 from "@/assets/optimized/logo/logo-72.webp";
import logo144 from "@/assets/optimized/logo/logo-144.webp";
import hero640Webp from "@/assets/optimized/hero/hero-640.webp";
import hero960Webp from "@/assets/optimized/hero/hero-960.webp";
import hero1280Webp from "@/assets/optimized/hero/hero-1280.webp";
import hero1920Webp from "@/assets/optimized/hero/hero-1920.webp";
import hero640Avif from "@/assets/optimized/hero/hero-640.avif";
import hero960Avif from "@/assets/optimized/hero/hero-960.avif";
import hero1280Avif from "@/assets/optimized/hero/hero-1280.avif";
import hero1920Avif from "@/assets/optimized/hero/hero-1920.avif";

export const clientLogos = [
  client01,
  client02,
  client03,
  client04,
  client05,
  client06,
  client07,
  client08,
  client09,
] as const;

export const siteLogo = {
  src: logo144,
  srcSet: `${logo72} 72w, ${logo144} 144w`,
  sizes: "36px",
  width: 144,
  height: 214,
} as const;

export const heroImage = {
  width: 1920,
  height: 1280,
  webp: {
    src: hero1280Webp,
    srcSet: `${hero640Webp} 640w, ${hero960Webp} 960w, ${hero1280Webp} 1280w, ${hero1920Webp} 1920w`,
  },
  avif: {
    src: hero1280Avif,
    srcSet: `${hero640Avif} 640w, ${hero960Avif} 960w, ${hero1280Avif} 1280w, ${hero1920Avif} 1920w`,
  },
  sizes: "100vw",
} as const;
