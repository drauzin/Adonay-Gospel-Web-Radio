import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import { RadioProvider } from "@/contexts/RadioContext";

const Index = () => {
  return (
    <RadioProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <CommunitySection />
        </main>
        <Footer />
      </div>
    </RadioProvider>
  );
};

export default Index;
