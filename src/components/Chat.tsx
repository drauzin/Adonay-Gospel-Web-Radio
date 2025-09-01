import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Message {
  id: number;
  username: string;
  text: string;
  inserted_at: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Autenticação
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Carregar mensagens e realtime
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("inserted_at", { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new) {
            setMessages((prev) => [...prev, payload.new as Message]);
            // Fade effect será ativado via CSS
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar mensagem
  const sendMessage = async () => {
    if (!text.trim() || !user) return;
    await supabase.from("messages").insert([{ username: user.email, text }]);
    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[400px] flex flex-col bg-[hsl(var(--gospel-dove))]/80 backdrop-blur-md border border-[hsl(var(--border))] rounded-3xl shadow-glow p-3">
      
      <div className="flex-1 overflow-y-auto mb-3 space-y-2 scrollbar-thin scrollbar-thumb-[hsl(var(--primary))]/40 scrollbar-track-[hsl(var(--gospel-dove))]/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-xl max-w-[80%] break-words transition-all duration-500 ease-out opacity-0 animate-fade-in
              ${msg.username === user?.email
                ? "bg-[hsl(var(--gospel-primary)/0.3)] self-end text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--gospel-soft))] self-start text-[hsl(var(--foreground))]"
              }`}
          >
            <strong className="block text-sm">{msg.username}</strong>
            <p className="text-base">{msg.text}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              {new Date(msg.inserted_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {user ? (
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] placeholder:text-gray-400 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all-smooth"
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-glow))] transition-all-smooth"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm mt-1">
          <a href="/login.html" className="text-[hsl(var(--primary))] underline">
            Faça login
          </a>{" "}
          para enviar mensagens.
        </p>
      )}
    </div>
  );
};

export default Chat;
