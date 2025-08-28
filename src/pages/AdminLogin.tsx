import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">Login Admin</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full rounded-lg border px-3 py-2"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border px-3 py-2"
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
