import SystemBar from "@/components/SystemBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Hierarchy from "@/components/Hierarchy";
import Operators from "@/components/Operators";
import Operations from "@/components/Operations";
import Initiation from "@/components/Initiation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SystemBar />
      <Nav />
      <Hero />
      <Manifesto />
      <Hierarchy />
      <Operators />
      <Operations />
      <Initiation />
      <Footer />
    </main>
  );
};

export default Index;
