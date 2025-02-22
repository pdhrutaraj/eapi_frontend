import { useState } from "react";
import api from "../utils/api";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("register/", { username, password });
      toast.success("Account created!");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;

