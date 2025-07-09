import { useState } from "react";
import { ArrowUpDown, Search, Star } from "lucide-react";

const NewGrid = ({ rowData, companies }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filter, setFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  //   const uniqueCompanies = getUniqueC
  // ompanies(rowData);

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
          difficultyFilter === "All" ||
          String(item.difficulty).toLowerCase() ===
            String(difficultyFilter).toLowerCase();

        const matchesCompany =
          companyFilter === "All" ||
          (item.companies &&
            item.companies.some(
              (company) => company.toLowerCase() === companyFilter.toLowerCase()
            ));
        return matchesSearch && matchesDifficulty && matchesCompany;
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
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Companies</option>
            {Object.keys(companies).map((key) => (
              <option key={companies[key].id} value={companies[key].id}>
                {companies[key].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gray-750 border-b border-gray-700">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-300">
          <div className="col-span-3">
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
          <div className="col-span-3">
            <button
              onClick={() => handleSort("companies")}
              className="flex items-center hover:text-white transition-colors"
            >
              Companies
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("topic")}
              className="flex items-center hover:text-white transition-colors"
            >
              Link
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("rating")}
              className="flex items-center hover:text-white transition-colors"
            >
              Rating
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
              <div className="col-span-3 text-white font-medium">
                {question.name}
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    String(question.difficulty).toLowerCase() === "easy"
                      ? "bg-green-900 text-green-300"
                      : question.difficulty === "medium"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <div className="col-span-3 flex flex-wrap gap-1 items-center">
                {question.companies && question.companies.length > 0 ? (
                  question.companies.map((company) => (
                    <span
                      key={company}
                      className="bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-600"
                    >
                      {company}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </div>
              <div className="col-span-2">
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline hover:text-blue-300 transition-colors break-all"
                >
                  {question.link}
                </a>
              </div>
              <div className="col-span-2 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    fill={question.rating >= star ? "#facc15" : "none"}
                    stroke="#facc15"
                    className={`w-4 h-4 mr-1 ${
                      question.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewGrid;
