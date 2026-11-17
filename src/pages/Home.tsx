import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Work } from "@/sections/Work";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Booking } from "@/sections/Booking";
import { Contact } from "@/sections/Contact";

/** Landing page — the full scrolling story. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Booking />
      <Contact />
    </>
  );
}
