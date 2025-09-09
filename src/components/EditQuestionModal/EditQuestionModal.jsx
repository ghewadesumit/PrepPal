import { useState, useMemo, useRef } from "react";
import Select from "react-select";
import { useQuestionStore } from "../../store/useQuestionStore";
import {
  Plus,
  Link,
  Star,
  Building,
  CheckCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { cloneDeep } from "lodash";
import {
  companiesKey,
  dsaQuestionsKey,
  frontEndQuestionsKey,
} from "../../constants/mock";

const EditQuestionModal = ({
  selectedNavItem,
  setIsOpen,
  companies,
  setCompanies,
  editMode,
  initialData,
}) => {
  const questionData = useRef(initialData);
  const [formData, setFormData] = useState({
    questionStatus: initialData.completed || false,
    questionRevision: initialData.revision || false,
    questionName: initialData.name,
    questionLink: initialData.link || "",
    questionSection: initialData.sections?.[0],
    questionDifficulty: initialData.difficulty || "easy",
    questionRating: initialData.rating ? initialData.rating.toString() : "3",
    questionCompanies: initialData.companies,
    questionNotes: initialData.notes,
    relatedQuestions: initialData.relatedQuestions,
  });

  const {
    allDsaQuestionsSet,
    allFrontEndQuestionsSet,
    setAllDsaQuestionsSet,
    setAllFrontEndQuestionsSet,
  } = useQuestionStore((state) => state);

  // Get all questions from the store (DSA or Frontend)
  const allQuestionsSet =
    selectedNavItem === "backend"
      ? allDsaQuestionsSet
      : allFrontEndQuestionsSet;

  const allQuestionsList = useMemo(() => {
    if (!allQuestionsSet) return [];
    return Object.values(allQuestionsSet).map((q) => ({
      value: q.id,
      label: q.name,
    }));
  }, [allQuestionsSet]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for react-select
  const handleRelatedQuestionsChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      relatedQuestions: selectedOptions || [],
    }));
  };

  const getCompanies = (companyList) => {
    return Array.from(
      new Set(
        companyList.map((c) => {
          const newCompany = c.trim().toLowerCase();
          if (Object.prototype.hasOwnProperty.call(companies, newCompany)) {
            return companies[newCompany].name;
          } else {
            // If company doesn't exist, add it to the companies list
            const newCompanyObj = {
              id: newCompany,
              name: newCompany.charAt(0).toUpperCase() + newCompany.slice(1),
            };
            const copyCompanies = cloneDeep(companies);
            copyCompanies[newCompany] = newCompanyObj;
            localStorage.setItem(companiesKey, JSON.stringify(copyCompanies));
            setCompanies(copyCompanies);
            return newCompanyObj.name;
          }
        })
      )
    );
  };

  const storeNewQuestion = (newQuestion) => {
    // console.log("Debug");

    const [currentQuestionSet, currentSetQuestionSet, currentQuestionKey] =
      selectedNavItem === "backend"
        ? [allDsaQuestionsSet, setAllDsaQuestionsSet, dsaQuestionsKey]
        : [
            allFrontEndQuestionsSet,
            setAllFrontEndQuestionsSet,
            frontEndQuestionsKey,
          ];

    let newCompanies = [];
    if (newQuestion.questionCompanies.trim().length > 0) {
      const companyList = newQuestion.questionCompanies.split(",");
      if (companyList.length > 0) {
        newCompanies = getCompanies(companyList);
      }
    }

    const questionId = questionData.current.id;

    const newQuestionObject = {
      ...questionData.current,
      link: newQuestion.questionLink,
      difficulty: newQuestion.questionDifficulty,
      rating: parseInt(newQuestion.questionRating, 10),
      completed: newQuestion.questionStatus,
      revision: newQuestion.questionRevision,
      companies: newCompanies,
      /**
       * Store notes about the question
       */
      notes: newQuestion.questionNotes,

      /**
       * store the id of question so that you can lookup into its object to get details
       * here value is id of the question
       */
      relatedQuestions: (newQuestion.relatedQuestions || []).map(
        (q) => q.value
      ),
    };

    const newQuestionSet = {
      ...currentQuestionSet,
    };

    newQuestionSet[questionId] = newQuestionObject;
    currentSetQuestionSet(newQuestionSet);

    localStorage.setItem(currentQuestionKey, JSON.stringify(newQuestionSet));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    storeNewQuestion(formData);

    // Reset form
    setFormData({
      questionStatus: false,
      questionRevision: false,
      questionName: "",
      questionLink: "",
      questionDifficulty: "easy",
      questionRating: "3",
      questionCompanies: "",
      questionNotes: "",
      relatedQuestions: [],
    });

    setIsOpen(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-900 rounded-t-3xl border-b border-gray-800 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editMode ? "Update Question" : "Add New Question"}
                </h2>
                <p className="text-sm text-gray-400">
                  {editMode
                    ? "Update existing challenge entry"
                    : "Create a new coding challenge entry"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Status Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="checkbox"
                  id="questionStatus"
                  name="questionStatus"
                  checked={formData.questionStatus}
                  onChange={handleInputChange}
                  className="sr-only"
                  value={formData.questionStatus}
                />
                <label
                  htmlFor="questionStatus"
                  className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.questionStatus
                      ? "border-green-500 bg-green-900/30 text-green-400"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 ${
                      formData.questionStatus
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium text-sm">Completed</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="checkbox"
                  id="questionRevision"
                  name="questionRevision"
                  checked={formData.questionRevision}
                  onChange={handleInputChange}
                  className="sr-only"
                  value={formData.questionRevision}
                />
                <label
                  htmlFor="questionRevision"
                  className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.questionRevision
                      ? "border-blue-500 bg-blue-900/30 text-blue-400"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <RotateCcw
                    className={`w-4 h-4 ${
                      formData.questionRevision
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium text-sm">Needs Revision</span>
                </label>
              </div>
            </div>

            {/* Question Link */}
            <div className="space-y-2">
              <label
                htmlFor="questionLink"
                className="block text-sm font-semibold text-gray-300 flex items-center space-x-2"
              >
                <Link className="w-4 h-4" />
                <span>Question Link</span>
              </label>
              <input
                type="url"
                id="questionLink"
                name="questionLink"
                value={formData.questionLink}
                onChange={handleInputChange}
                required
                placeholder="https://leetcode.com/problems/..."
                className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500 bg-gray-800"
              />
            </div>

            {/* Related Questions Multi-Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Related Questions
              </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                name="relatedQuestions"
                options={allQuestionsList}
                value={formData.relatedQuestions}
                onChange={handleRelatedQuestionsChange}
                classNamePrefix="react-select"
                placeholder="Search and select related questions..."
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                    color: "white",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#2563eb"
                      : state.isFocused
                      ? "#2563eb" // blue on hover
                      : "#1f2937",
                    color: "#fff",
                    cursor: "pointer",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#2563eb",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                }}
              />
            </div>

            {/*Notes about question */}
            <div className="space-y-2">
              <label
                htmlFor="questionNotes"
                className="block text-sm font-semibold text-gray-300 flex items-center space-x-2"
              >
                <Link className="w-4 h-4" />
                <span>Notes</span>
              </label>
              <textarea
                type="url"
                id="questionNotes"
                name="questionNotes"
                value={formData.questionNotes}
                onChange={handleInputChange}
                required
                placeholder="Write your notes here"
                className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500 bg-gray-800 h-24 resize-none"
              />
            </div>

            {/* Difficulty and Rating Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Difficulty */}
              <div className="space-y-2">
                <label
                  htmlFor="questionDifficulty"
                  className="block text-sm font-semibold text-gray-300"
                >
                  Difficulty Level
                </label>
                <select
                  id="questionDifficulty"
                  name="questionDifficulty"
                  value={formData.questionDifficulty}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getDifficultyColor(
                    formData.questionDifficulty
                  )} bg-gray-800`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label
                  htmlFor="questionRating"
                  className="block text-sm font-semibold text-gray-300 flex items-center space-x-2"
                >
                  <Star className="w-4 h-4" />
                  <span>Rating</span>
                </label>
                <select
                  id="questionRating"
                  name="questionRating"
                  value={formData.questionRating}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white bg-gray-800"
                >
                  <option value="1">⭐ 1 Star</option>
                  <option value="2">⭐⭐ 2 Stars</option>
                  <option value="3">⭐⭐⭐ 3 Stars</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                </select>
              </div>
            </div>

            {/* Companies */}
            <div className="space-y-2">
              <label
                htmlFor="questionCompanies"
                className="block text-sm font-semibold text-gray-300 flex items-center space-x-2"
              >
                <Building className="w-4 h-4" />
                <span>Companies</span>
              </label>
              <input
                type="text"
                id="questionCompanies"
                name="questionCompanies"
                value={formData.questionCompanies}
                onChange={handleInputChange}
                placeholder="Google, Microsoft, Amazon..."
                className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500 bg-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-900 rounded-b-3xl border-t border-gray-800 p-6">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 px-6 border border-gray-700 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{editMode ? "Updating..." : "Adding..."}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>{editMode ? "Update Question" : "Add Question"}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
