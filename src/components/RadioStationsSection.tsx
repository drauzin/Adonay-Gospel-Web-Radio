import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Play, Pause } from "lucide-react";
import { useRadio } from "@/contexts/RadioContext";

const RadioStationsSection = () => {
  const { currentRadio, isPlaying, isLoading, playRadio, pauseRadio } = useRadio();

  const stations = [
    { id: 1, name: "Melodia Gospel FM", url: "https://stm8.voxhd.com.br:7116/stream" },
    { id: 2, name: "Gospel FM 89.3", url: "https://www.appradio.app:8161/live" },
    { id: 3, name: "93 FM Gospel", url: "https://servidor31.brlogic.com:8018/live" },
    { id: 4, name: "Novo Tempo", url: "https://stream.live.novotempo.com/radio/smil:rntSalvadorBA.smil/playlist.m3u8" },
    { id: 5, name: "Radio Fé Inabalável", url: "https://stm.voxhd.com.br:7290/stream" },
    
  ];

  const handlePlayPause = async (station: typeof stations[0]) => {
    if (currentRadio?.id === station.id && isPlaying) {
      pauseRadio();
    } else {
      await playRadio(station);
    }
  };

  return (
    <section id="radio-stations" className="py-16 bg-gospel-dove">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Rádios Gospel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure suas rádios gospel favoritas. Adicione o nome e a URL de transmissão 
            de cada estação para criar sua lista personalizada.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => {
              const isCurrentlyPlaying = currentRadio?.id === station.id && isPlaying;
              const isCurrentRadioLoading = currentRadio?.id === station.id && isLoading;
              
              return (
                <Card key={station.id} className={`shadow-soft hover:shadow-glow transition-all duration-300 bg-card cursor-pointer ${isCurrentlyPlaying ? 'ring-2 ring-primary/50' : ''}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Radio className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg">{station.name}</span>
                      </div>
                      {isCurrentlyPlaying && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant={isCurrentlyPlaying ? "default" : "soft"} 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={() => handlePlayPause(station)}
                      disabled={isCurrentRadioLoading}
                    >
                      {isCurrentRadioLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                      ) : isCurrentlyPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                      {isCurrentRadioLoading ? 'Conectando...' : isCurrentlyPlaying ? 'Pausar' : 'Ouvir'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadioStationsSection;