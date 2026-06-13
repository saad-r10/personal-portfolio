import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
