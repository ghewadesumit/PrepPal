import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";

const NewGrid = ({ rowData }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filter, setFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData =
    rowData
      ?.filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(filter.toLowerCase());

        const matchesDifficulty =
          difficultyFilter === "All" || item.difficulty === difficultyFilter;
        const matchesStatus =
          statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesDifficulty && matchesStatus;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }) || [];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-700 bg-gray-750">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gray-750 border-b border-gray-700">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-300">
          <div className="col-span-4">
            <button
              onClick={() => handleSort("title")}
              className="flex items-center hover:text-white transition-colors"
            >
              Title
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("difficulty")}
              className="flex items-center hover:text-white transition-colors"
            >
              Difficulty
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("status")}
              className="flex items-center hover:text-white transition-colors"
            >
              Status
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("topic")}
              className="flex items-center hover:text-white transition-colors"
            >
              Topic
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("dateAdded")}
              className="flex items-center hover:text-white transition-colors"
            >
              Date Added
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAndSortedData.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No questions found
          </div>
        ) : (
          filteredAndSortedData.map((question, index) => (
            <div
              key={question.id}
              className={`grid grid-cols-12 gap-4 p-4 text-sm border-b border-gray-700 hover:bg-gray-750 transition-colors ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-775"
              }`}
            >
              <div className="col-span-4 text-white font-medium">
                {question.title}
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    question.difficulty === "Easy"
                      ? "bg-green-900 text-green-300"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    question.status === "Completed"
                      ? "bg-green-900 text-green-300"
                      : question.status === "In Progress"
                      ? "bg-blue-900 text-blue-300"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {question.status}
                </span>
              </div>
              <div className="col-span-2 text-gray-300">{question.topic}</div>
              <div className="col-span-2 text-gray-400">
                {question.dateAdded}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewGrid;
