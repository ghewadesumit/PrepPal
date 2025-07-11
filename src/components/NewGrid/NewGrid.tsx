import { useState } from "react";
import { ArrowUpDown, Search, Star, Check, X } from "lucide-react";

const NewGrid = ({
  rowData,
  companies,
  setSectionData,
  sectionData,
  selectedNavItem,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filter, setFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  // Local storage keys (you might want to import these from constants)
  const dsaQuestionsKey = "dsaQuestions";
  const frontEndQuestionsKey = "frontEndQuestions";

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleStatus = (questionId, statusType) => {
    if (!setSectionData || !sectionData) return;

    const updatedSectionData = { ...sectionData };

    // Find the section containing this question
    Object.keys(updatedSectionData).forEach((sectionKey) => {
      const questionIndex = updatedSectionData[sectionKey].questions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        // Toggle the status
        updatedSectionData[sectionKey].questions[questionIndex][statusType] =
          !updatedSectionData[sectionKey].questions[questionIndex][statusType];

        // Update localStorage
        const localKey =
          selectedNavItem === "backend"
            ? dsaQuestionsKey
            : frontEndQuestionsKey;
        localStorage.setItem(localKey, JSON.stringify(updatedSectionData));

        // Update state
        setSectionData(updatedSectionData);
      }
    });
  };

  const getRowBackgroundClass = (question) => {
    if (question.completed && question.revision) {
      return "bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30";
    } else if (question.completed) {
      return "bg-green-900/20 border-green-500/30 hover:bg-green-900/30";
    } else if (question.revision) {
      return "bg-yellow-900/20 border-yellow-500/30 hover:bg-yellow-900/30";
    }
    return "bg-gray-800 hover:bg-gray-750";
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

        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Completed" && item.completed) ||
          (statusFilter === "Revision" && item.revision) ||
          (statusFilter === "Pending" && !item.completed && !item.revision);

        const matchesCompany =
          companyFilter === "All" ||
          (item.companies &&
            item.companies.some(
              (company) => company.toLowerCase() === companyFilter.toLowerCase()
            ));
        return (
          matchesSearch && matchesDifficulty && matchesStatus && matchesCompany
        );
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
        <div className="grid grid-cols-12 gap-6 p-6 text-sm font-medium text-gray-300">
          <div className="col-span-1">
            <button
              onClick={() => handleSort("completed")}
              className="flex items-center hover:text-white transition-colors"
            >
              Completed
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => handleSort("revision")}
              className="flex items-center hover:text-white transition-colors"
            >
              Revision
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-3">
            <button
              onClick={() => handleSort("title")}
              className="flex items-center hover:text-white transition-colors"
            >
              Title
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => handleSort("difficulty")}
              className="flex items-center hover:text-white transition-colors"
            >
              Difficulty
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>

          <div className="col-span-1">
            <button
              onClick={() => handleSort("rating")}
              className="flex items-center hover:text-white transition-colors"
            >
              Rating
              <ArrowUpDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="col-span-4">
            <button
              onClick={() => handleSort("companies")}
              className="flex items-center hover:text-white transition-colors"
            >
              Companies
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
              className={`grid grid-cols-12 gap-3 p-6 text-sm border-b border-gray-700 hover:bg-gray-750 transition-colors ${getRowBackgroundClass(
                question
              )} ${index % 2 === 0 ? "" : "bg-opacity-50"}`}
            >
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => toggleStatus(question.id, "completed")}
                  className={`relative w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    question.completed
                      ? "bg-green-600 border-green-500 hover:bg-green-700"
                      : "border-gray-500 hover:border-green-500 hover:bg-green-600/10"
                  }`}
                >
                  {question.completed && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => toggleStatus(question.id, "revision")}
                  className={`relative w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    question.revision
                      ? "bg-yellow-600 border-yellow-500 hover:bg-yellow-700"
                      : "border-gray-500 hover:border-yellow-500 hover:bg-yellow-600/10"
                  }`}
                >
                  {question.revision && (
                    <X className="w-4 h-4 text-white rotate-45" />
                  )}
                </button>
              </div>
              <div className="col-span-3 font-medium">
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
                >
                  {question.name}
                </a>
              </div>
              <div className="col-span-1">
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

              <div className="col-span-1 flex items-center">
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

              <div className="col-span-4 flex flex-wrap gap-1 items-center">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewGrid;
