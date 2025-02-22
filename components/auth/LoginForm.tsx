import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { storeTokens } from "../../utils/auth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("token/", { username, password });
      storeTokens(response.data.access, response.data.refresh);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
};

export default LoginForm;

