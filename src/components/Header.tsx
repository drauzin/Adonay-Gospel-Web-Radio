import { Button } from "@/components/ui/button";
import { Heart, Users, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (!user) window.location.href = "/login.html"; // Página de login
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2 rounded-xl shadow-soft">
            <Radio className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-1xl font-serif font-bold text-foreground">Adonay Gospel</h1>
            <p className="text-xs text-muted-foreground">24h no ar</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="soft" size="sm">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favoritos</span>
          </Button>
          <Button variant="gospel" size="sm" onClick={handleButtonClick}>
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{user ? user.email : "Faça seu login"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
