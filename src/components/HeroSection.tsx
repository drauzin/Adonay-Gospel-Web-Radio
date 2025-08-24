import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, Heart, Share2 } from "lucide-react";
import { useRadio } from "@/contexts/RadioContext";
import heroImage from "../assets/hero-radio.jpg";

const HeroSection = () => {
  const { currentRadio, isPlaying, isLoading, volume, playRadio, pauseRadio, setVolume } = useRadio();

  const togglePlay = async () => {
    if (!currentRadio) return;
    
    if (isPlaying) {
      pauseRadio();
    } else {
      await playRadio(currentRadio);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setVolume(Math.round(percentage));
  };

  const scrollToStations = () => {
    document.getElementById("radio-stations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center gradient-soft">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Louvor e Adoração 24h
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            As melhores músicas gospel 24 horas por dia. 
            Edificação, louvor e palavra para toda a família cristã.
          </p>

          {/* Radio Player Card */}
          <Card className="max-w-md mx-auto mb-8 shadow-soft bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-1">Tocando agora</p>
                <h3 className="font-semibold text-foreground">
                  {currentRadio?.name || 'Radio 1'}
                </h3>
                <p className="text-sm text-muted-foreground">Gospel Hits</p>
              </div>

              {/* Play Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button variant="soft" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="play" 
                  size="icon"
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="transform hover:scale-110 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-foreground border-t-transparent" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <Button variant="soft" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <div 
                  className="flex-1 bg-gospel-soft rounded-full h-2 relative cursor-pointer"
                  onClick={handleVolumeChange}
                >
                  <div 
                    className="gradient-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-[3ch]">{volume}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={() => {
  document.getElementById("radio-stations")?.scrollIntoView({ behavior: "smooth" });
}}>
  Ouvir ao Vivo
</Button>

            <Button variant="soft" size="xl" onClick={scrollToStations}>
              Ver Programação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
