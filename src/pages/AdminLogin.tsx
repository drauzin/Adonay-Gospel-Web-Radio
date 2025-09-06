import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// Configuração do Supabase
const supabaseUrl = "https://wbhrljyegtuxcrriaqis.supabase.co";
const supabaseKey = "SUA_CHAVE_SUPABASE"; // Coloque sua key real aqui
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Supondo que você tenha um usuário "admin" no Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // use email como usuário ou adapte para username
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.session) {
        // Redireciona para a área admin
        navigate("/admin-dashboard"); // coloque a rota do painel admin
      }
    } catch (err) {
      setErrorMsg("Erro ao conectar com o Supabase.");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">Login Admin</h1>
        {errorMsg && (
          <p className="text-red-500 text-center mb-2">{errorMsg}</p>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
