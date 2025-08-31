import Chat from '../components/Chat';
import HeroSection from './HeroSection'
import RadioStationsSection from './VersiculosSection'


const HomePage = () => {
  return (
    <div className="bg-gospel-background min-h-screen">
      <HeroSection />
      <RadioStationsSection />
      <Chat />  {/* Aqui */}
    </div>
  );
};
