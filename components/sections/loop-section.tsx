import { Image } from "lucide-react";
import LogoLoop from "../LogoLoop";

const techLogos = [
  { node: <Image />, title: "React", href: "https://react.dev" },
  { node: <Image />, title: "Next.js", href: "https://nextjs.org" },
  { node: <Image />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <Image />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/adwi_logo.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/adwi_logo.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/adwi_logo.png", alt: "Company 3", href: "https://company3.com" },
];

export default function Loop() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={imageLogos}
        speed={70}
        direction="left"
        logoHeight={70}
        gap={80}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#fff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}