import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { getAccessToken, logout } from "../utils/auth";

interface Switch {
  id: number;
  name: string;
  state: boolean;
}

const Dashboard = () => {
  const [switches, setSwitches] = useState<Switch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSwitches = async () => {
      try {
        const response = await api.get("switches/", {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        setSwitches(response.data);
      } catch (error) {
	console.error("Error fetching switches:", error);  // Use the error here
        logout();
        router.push("/login");
      }
    };

    if (getAccessToken()) {
      fetchSwitches();
    } else {
      router.push("/login");
    }
  }, [router]); // ✅ Added 'router' to the dependency array

  const toggleSwitch = async (id: number) => {
    try {
      const switchToUpdate = switches.find((sw) => sw.id === id);
      const updatedState = !switchToUpdate?.state;
      await api.patch(`switches/${id}/`, { state: updatedState }, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
      setSwitches((prev) => prev.map((sw) => (sw.id === id ? { ...sw, state: updatedState } : sw)));
    } catch (error) {
      console.error("Error fetching switches:", error);  // Use the error here
      alert("Failed to update switch");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Switch Dashboard</h1>
      <button className="bg-red-500 text-white p-2 mt-2" onClick={logout}>
        Logout
      </button>
      <ul className="mt-4">
        {switches.map((sw) => (
          <li key={sw.id} className="flex justify-between p-2 border">
            {sw.name} - {sw.state ? "ON" : "OFF"}
            <button
              onClick={() => toggleSwitch(sw.id)}
              className={`p-2 ${sw.state ? "bg-green-500" : "bg-gray-400"} text-white`}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

