import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import do navigate
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate(); // 👈 hook para redirecionamento SPA

  useEffect(() => {
    // Checa sessão atual
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listener de mudança de autenticação
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLoginClick = () => {
    if (!user) navigate("/login"); // redireciona para login SPA
  };

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // redireciona para home após logout
  };

  return (
    <header className="bg-gradient-to-b from-white/90 via-yellow-50/80 to-white/90 backdrop-blur-md border-b border-yellow-200 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-xl shadow-md">
            <Users className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <h1 className="text-1xl font-serif font-bold text-yellow-800 drop-shadow-md">
              Adonay Gospel
            </h1>
            <p className="text-xs text-yellow-600">24h no ar</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gospel"
            size="sm"
            onClick={handleLoginClick}
            className="bg-white border border-yellow-300 text-yellow-800 hover:bg-yellow-50 shadow transition-all"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">
              {user?.user_metadata?.full_name ?? "Faça seu login"}
            </span>
          </Button>

          {user && (
            <Button
              variant="soft"
              size="sm"
              onClick={handleLogoutClick}
              className="bg-yellow-700 text-white hover:bg-yellow-600 shadow transition-all"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
