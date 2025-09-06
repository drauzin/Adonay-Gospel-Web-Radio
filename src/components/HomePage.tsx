import HeroSection from "./HeroSection";
import BibleVerseSection from "./VersiculosSection";
import ProgramsSection from "./ProgramsSection"; // se você tiver essa seção
import { RadioProvider } from "@/contexts/RadioContext"; // necessário para HeroSection

const HomePage = () => {
  return (
    <RadioProvider>
      <div className="flex flex-col">
        {/* Hero principal com rádio */}
        <HeroSection />

        {/* Seção de versículo do dia */}
        <BibleVerseSection />

        {/* Seção de programação */}
        <ProgramsSection />
      </div>
    </RadioProvider>
  );
};

export default HomePage;
