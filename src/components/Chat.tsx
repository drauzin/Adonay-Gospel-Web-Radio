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

    return () => {
      listener.subscription.unsubscribe();
    };
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
          if (payload.new) setMessages((prev) => [...prev, payload.new as Message]);
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
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-white border p-2 flex flex-col shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 mb-1 rounded ${
              msg.username === user?.email ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            <strong>{msg.username}</strong>
            <p>{msg.text}</p>
            <span className="text-xs">{new Date(msg.inserted_at).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {user ? (
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-1 flex-1 rounded"
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="p-1 rounded bg-blue-600 text-white" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm mt-1">
          <a href="/login.html" className="text-blue-600 underline">
            Faça login
          </a>{" "}
          para enviar mensagens.
        </p>
      )}
    </div>
  );
};

export default Chat;
