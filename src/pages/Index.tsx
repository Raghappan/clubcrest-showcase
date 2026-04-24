import SystemBar from "@/components/SystemBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Hierarchy from "@/components/Hierarchy";
import Operators from "@/components/Operators";
import Operations from "@/components/Operations";
import Initiation from "@/components/Initiation"; 
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

useEffect(() => {
  const keys: string[] = [];
  const secret = "dxl";
  const handler = (e: KeyboardEvent) => {
    keys.push(e.key.toLowerCase());
    if (keys.slice(-3).join("") === secret) navigate("/admin");
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);
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
