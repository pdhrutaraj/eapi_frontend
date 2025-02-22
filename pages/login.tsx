import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { storeTokens } from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await api.post("token/", { username, password });
    console.log("Login success:", response.data); // Debugging
    storeTokens(response.data.access, response.data.refresh);
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    alert("Login failed: " + (error.response?.data?.detail || "Unknown error"));
  }
};

/*
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("token/", { username, password });
      storeTokens(response.data.access, response.data.refresh);
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };
*/
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold">Login</h2>
        <input className="block p-2 my-2 border" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="block p-2 my-2 border" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 mt-2" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

