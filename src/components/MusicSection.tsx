import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart, Download, Clock } from "lucide-react";

const topSongs = [
  {
    id: 1,
    title: "Caia Fogo",
    artist: "Fernandinho",
    album: "Teus Sonhos",
    duration: "4:32",
    plays: "2.5M"
  },
  {
    id: 2,
    title: "Filho do Carpinteiro",
    artist: "Júlia Vitória",
    album: "Single",
    duration: "3:45",
    plays: "1.8M"
  },
  {
    id: 3,
    title: "Bondade e Misericórdia",
    artist: "Ministério Zoe",
    album: "Vida Nova",
    duration: "5:18",
    plays: "3.2M"
  },
  {
    id: 4,
    title: "Gratidão",
    artist: "Aline Barros",
    album: "Esperança",
    duration: "4:10",
    plays: "4.1M"
  },
  {
    id: 5,
    title: "Eu Navegarei",
    artist: "Gabriela Rocha",
    album: "Pra Onde Iremos?",
    duration: "6:22",
    plays: "5.7M"
  }
];

const MusicSection = () => {
  return (
    <section id="music" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Top Músicas Gospel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            As músicas mais tocadas da nossa rádio. Louve ao Senhor com os maiores 
            sucessos da música cristã.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-soft bg-card">
            <CardContent className="p-0">
              {topSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-4 hover:bg-gospel-soft/50 transition-colors border-b border-border last:border-b-0"
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-lg font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>

                  {/* Album Art Placeholder */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gospel-secondary/30 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary" />
                  </div>

                  {/* Song Info */}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {song.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{song.duration}</span>
                    </div>
                    <span>{song.plays} plays</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Featured Playlists */}
          <div className="mt-12">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Playlists em Destaque
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Louvor e Adoração", count: "45 músicas", color: "bg-gospel-primary" },
                { name: "Gospel Hits", count: "32 músicas", color: "bg-gospel-secondary" },
                { name: "Contemporâneo", count: "28 músicas", color: "bg-gospel-accent" }
              ].map((playlist, index) => (
                <Card key={index} className="shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-full h-32 ${playlist.color} rounded-lg mb-4 flex items-center justify-center`}>
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {playlist.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {playlist.count}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;