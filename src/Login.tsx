import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = "/dashboard.html";
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Verifique seu email para confirmar o cadastro!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <div className="flex gap-2">
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
        <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">Registrar</button>
      </div>
    </div>
  );
};

export default Login;
