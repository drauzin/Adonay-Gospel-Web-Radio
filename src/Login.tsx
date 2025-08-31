import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://wbhrljyegtuxcrriaqis.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiaHJsanllZ3R1eGNycmlhcWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMzU5NzYsImV4cCI6MjA3MDYxMTk3Nn0.V5v66K84usz0DFucKHW7NjptTtlEalCXaowNtsHAiYw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/"); // SPA navigation
    });
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      setErrorMsg("Preencha todos os campos!");
      return;
    }
    setErrorMsg("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else navigate("/");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/" }
      });
      if (error) setErrorMsg(error.message);
      else navigate("/");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/" },
    });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-yellow-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center relative">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-yellow-700 font-semibold hover:text-yellow-500 transition"
        >
          &larr; Voltar
        </button>

        <h2 className="text-3xl font-bold mb-6 text-yellow-700 drop-shadow-md">
          {isLogin ? "Login" : "Registro"}
        </h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-4 mb-4 rounded-xl border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full p-4 mb-4 rounded-xl bg-yellow-700 text-white font-bold hover:bg-yellow-600 shadow-md transition"
        >
          {isLogin ? "Entrar" : "Registrar"}
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full p-4 mb-4 rounded-xl bg-white border border-yellow-300 text-yellow-700 flex items-center justify-center gap-3 hover:bg-yellow-50 shadow transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Entrar com Google
        </button>

        <p className="text-yellow-900 text-sm">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <span
            className="cursor-pointer underline font-semibold"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
          >
            {isLogin ? "Registre-se" : "Faça login"}
          </span>
        </p>
      </div>
    </div>
  );
}
