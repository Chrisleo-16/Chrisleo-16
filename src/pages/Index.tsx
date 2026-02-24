import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChrisBot from "@/components/ChrisBot";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
      <ChrisBot />
      <ScrollToTop />
    </>
  );
};

export default Index;
