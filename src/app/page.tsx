import { Hero } from "@/sections/Hero";
import { Playground } from "@/sections/Playground";
import { Manifesto } from "@/sections/Manifesto";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Playground />
      <Manifesto />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
