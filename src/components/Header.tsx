import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const [user, setUser] = useState<any>(null);

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

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2 rounded-xl shadow-soft">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-1xl font-serif font-bold text-foreground">Adonay Gospel</h1>
            <p className="text-xs text-muted-foreground">24h no ar</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
        <Button
  variant="gospel"
  size="sm"
  onClick={() => {
    if (!user) window.location.href = "/login.html";
    // Se estiver logado, não faz nada (simula desabilitado)
  }}
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
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                window.location.href = "/"; // redireciona após logout
              }}
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
