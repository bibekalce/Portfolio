import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider flip />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider flip />
      <Education />
      <SectionDivider />
      <Contact />
      <CoverLetterGenerator />
      <Footer />
      <ChatWidget />
    </main>
  );
}
