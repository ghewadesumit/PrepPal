import React from "react";

const navItems = [
  { id: "backend", name: "Back-End Questions" },
  { id: "frontend", name: "Front-End Questions" },
];

const NavBar = ({ setSelected, selected }) => {
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
          <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
