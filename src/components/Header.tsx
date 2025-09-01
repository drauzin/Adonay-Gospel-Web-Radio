import { Button } from "@/components/ui/button";
import { Users, Play, Pause, Heart, Share2, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useRadio } from "@/contexts/RadioContext";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const { currentRadio, isPlaying, isLoading, volume, playRadio, pauseRadio, setVolume } = useRadio();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLoginClick = () => {
    if (!user) navigate("/login");
  };

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

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
    <header className="bg-white sticky top-0 z-50 shadow-md backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-3 rounded-full shadow-sm flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Adonay Gospel</h1>
            <p className="text-xs text-blue-500">"Sua trilha sonora de fé e esperança"</p>
          </div>
        </div>

        {/* Botões de usuário */}
        <div className="flex items-center gap-2">
          <Button
            variant="gospel"
            size="sm"
            onClick={handleLoginClick}
            className="flex items-center gap-2 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-full px-4 py-2 shadow-sm transition-all"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.user_metadata?.full_name ?? "Faça seu login"}</span>
          </Button>

          {user && (
            <Button
              variant="soft"
              size="sm"
              onClick={handleLogoutClick}
              className="bg-blue-600 text-white hover:bg-blue-500 rounded-full px-4 py-2 shadow-sm transition-all"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Player */}
      {currentRadio && (
        <div className="bg-white flex items-center justify-between px-4 py-3 shadow-inner sticky bottom-0 z-50 rounded-t-xl">
          <div className="flex flex-col">
            <span className="text-blue-800 font-semibold">{currentRadio.name}</span>
            <span className="text-sm text-blue-500">Gospel Hits</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="soft" size="icon" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full p-2">
              <Heart className="h-4 w-4" />
            </Button>

            <Button
              variant="soft"
              size="icon"
              onClick={togglePlay}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 rounded-full p-2 shadow-md transition-all"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="soft"
              size="icon"
              onClick={handleShare}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-blue-700" />
              <div
                className="bg-blue-100 h-2 w-24 rounded-full relative cursor-pointer overflow-hidden"
                onClick={handleVolumeChange}
              >
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${volume}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
