import { useState } from "react";
import { ChevronDown, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/useUserStore";

const navItems = [
  { id: "backend", name: "Back-End Questions" },
  { id: "frontend", name: "Front-End Questions" },
];

const NavBar = ({ setSelected, selected }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { userInfo, setUserInfo } = useUserStore((state) => state);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUserInfo({ pictureUrl: "", name: "", email: "", googleId: "" });
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
                    selected === item.id
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => setSelected(item.id)}
                >
                  {item.name}
                </button>
              ))}

              <button
                className={`px-4 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
                  selected === "pomodoro"
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => setSelected("pomodoro")}
              >
                Pomodoro
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
                selected === "dashboard"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setSelected("dashboard")}
            >
              Dashboard
            </button>

            <div className="relative">
              <button
                type="button"
                aria-label="Open user menu"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-gray-200 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {userInfo.pictureUrl ? (
                  <img
                    src={userInfo.pictureUrl}
                    alt={userInfo.name || "User profile"}
                    className="h-9 w-9 rounded-full border border-gray-600 object-cover"
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <UserCircle className="h-9 w-9 text-gray-400" />
                )}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-14 z-50 w-64 rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-xl">
                  
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="mt-2 flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-200 transition-colors hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
