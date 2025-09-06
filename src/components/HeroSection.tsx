import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, Heart, Share2 } from "lucide-react";
import { useRadio } from "@/contexts/RadioContext";
import heroImage from "../assets/hero-radio.jpg";

const HeroSection = () => {
  const {
    currentRadio,
    isPlaying,
    isLoading,
    volume,
    playRadio,
    pauseRadio,
    setVolume,
  } = useRadio();

  const togglePlay = async () => {
    if (!currentRadio) return;
    if (isPlaying) pauseRadio();
    else await playRadio(currentRadio);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setVolume(Math.round(percentage));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Adonay Gospel",
          text: "Louvor e Adoração 24h 🎶🙌",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("🔗 Link copiado!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-white">
      {/* Background Image com aura suave */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-blue-900 drop-shadow-md mb-6">
            Louvor e Adoração 24h
          </h1>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            As melhores músicas gospel 24 horas por dia. Edificação, louvor e
            palavra para toda a família cristã.
          </p>

          {/* Radio Player Card */}
          <Card className="max-w-md mx-auto mb-8 shadow-md hover:shadow-lg bg-white border border-blue-100 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm stext-blue-600 mb-1">Tocando agora</p>
                <h3 className="font-semibold text-blue-800">
                  {currentRadio?.name || "Radio 1"}
                </h3>
                <p className="text-sm text-blue-700">Gospel Hits</p>
              </div>

              {/* Controles de reprodução */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant="soft"
                  size="sm"
                  className="1bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                <Button
                  variant="soft"
                  size="icon"
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="transform hover:scale-110 transition-all duration-300 bg-blue-100 text-blue-800"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-800 border-t-transparent" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="soft"
                  size="sm"
                  onClick={handleShare}
                  className="bg-blue-50 text-blue-800 hover:bg-blue-100"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Controle de volume */}
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-blue-700" />
                <div
                  className="flex-1 bg-blue-100 rounded-full h-2 relative cursor-pointer"
                  onClick={handleVolumeChange}
                >
                  <div
                    className="bg-gradient-to-r from-blue-300 to-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-sm text-blue-700 min-w-[3ch]">
                  {volume}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
