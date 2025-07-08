import React from "react";

const TailwindTest = () => {
  return (
    <div>
      {/* Test 1: Basic colors and spacing */}
      <div className="bg-red-500 text-white p-4 m-4">
        RED BOX - If this is red with white text, Tailwind is working
      </div>

      {/* Test 2: More complex styling */}
      <div className="bg-blue-600 text-white p-8 m-4 rounded-lg shadow-lg">
        BLUE BOX - If this is blue with rounded corners and shadow, Tailwind is
        working
      </div>

      {/* Test 3: Responsive and gradients */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 m-4 rounded-full text-center">
        GRADIENT BOX - If this has a purple-to-pink gradient, Tailwind is
        working
      </div>

      {/* Test 4: Grid and flexbox */}
      <div className="grid grid-cols-2 gap-4 m-4">
        <div className="bg-green-500 text-white p-4 rounded">Grid 1</div>
        <div className="bg-yellow-500 text-white p-4 rounded">Grid 2</div>
      </div>

      {/* Debug info */}
      <div className="m-4 p-4 border border-gray-300 rounded">
        <h3 className="font-bold mb-2">Debug Information:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            If you see plain text with no styling, Tailwind CSS is NOT loaded
          </li>
          <li>
            If you see colored boxes with proper styling, Tailwind CSS IS
            working
          </li>
          <li>Check your browser's developer console for any errors</li>
          <li>Check your main CSS file has the @tailwind directives</li>
        </ul>
      </div>
    </div>
  );
};

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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
