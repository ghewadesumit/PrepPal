import React, { useState } from "react";
import { useQuestionStore } from "../../store/useQuestionStore";
import { useActivityStore } from "../../store/useActivityStore";
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
import { updateCalendarActivity } from "../../utils/helper";
import {
  companiesKey,
  dsaQuestionsKey,
  dsaSectionKey,
  frontEndQuestionsKey,
  frontEndSectionKey,
} from "../../constants/mock";

const AddQuestion = ({
  selectedNavItem,
  setSectionData,
  sectionData,
  questionSectionsData,
  setIsOpen,
  companies,
  setCompanies,
}) => {
  const [formData, setFormData] = useState({
    questionStatus: false,
    questionRevision: false,
    questionName: "",
    questionLink: "",
    questionSection:
      questionSectionsData[Reflect.ownKeys(questionSectionsData)[0]].id || "", // Default to first section
    questionDifficulty: "easy",
    questionRating: "3",
    questionCompanies: "",
  });

  const {
    totalDsaQuestions,
    completedDsaQuestions,
    revisionDsaQuestions,
    totalFrontEndQuestions,
    completedFrontEndQuestions,
    revisionFrontEndQuestions,
    setCompletedDsaQuestions,
    setRevisionDsaQuestions,
    setTotalDsaQuestions,
    setCompletedFrontEndQuestions,
    setRevisionFrontEndQuestions,
    setTotalFrontEndQuestions,
    allDsaQuestionsSet,
    allFrontEndQuestionsSet,
    setAllDsaQuestionsSet,
    setAllFrontEndQuestionsSet,
  } = useQuestionStore((state) => state);

  const {
    calendarData,
    setCalendarData,
    activityCalendarData,
    setActivityCalendarData,
  } = useActivityStore((state) => state);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateQuestionCount = (count, status, revision) => {
    if (selectedNavItem === "backend") {
      setTotalDsaQuestions(totalDsaQuestions + count);
      if (status) {
        setCompletedDsaQuestions(completedDsaQuestions + count);
      }
      if (revision) {
        setRevisionDsaQuestions(revisionDsaQuestions + count);
      }
    } else {
      setTotalFrontEndQuestions(totalFrontEndQuestions + count);
      if (status) {
        setCompletedFrontEndQuestions(completedFrontEndQuestions + count);
      }
      if (revision) {
        setRevisionFrontEndQuestions(revisionFrontEndQuestions + count);
      }
    }
  };

  // function to get id of the question based on the name
  const formatToCamelCase = (str) => {
    return str
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim() // Trim leading and trailing spaces
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
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

    const [
      currentQuestionSet,
      currentSetQuestionSet,
      currentQuestionKey,
      currentSectionKey,
    ] =
      selectedNavItem === "backend"
        ? [
            allDsaQuestionsSet,
            setAllDsaQuestionsSet,
            dsaQuestionsKey,
            dsaSectionKey,
          ]
        : [
            allFrontEndQuestionsSet,
            setAllFrontEndQuestionsSet,
            frontEndQuestionsKey,
            frontEndSectionKey,
          ];
    const updatedSectionData = { ...sectionData };
    const sectionKey = newQuestion.questionSection;

    if (!updatedSectionData[sectionKey]) {
      updatedSectionData[sectionKey] = [];
    }

    updateQuestionCount(
      1,
      newQuestion.questionStatus,
      newQuestion.questionRevision
    );

    let newCompanies = [];
    if (newQuestion.questionCompanies.trim().length > 0) {
      const companyList = newQuestion.questionCompanies.split(",");
      if (companyList.length > 0) {
        newCompanies = getCompanies(companyList);
      }
    }

    const questionId = formatToCamelCase(newQuestion.questionName);
    updatedSectionData[sectionKey].push(questionId);

    const newQuestionObject = {
      createdAt: Date.now().toString(), // Simple unique ID
      id: questionId, // Simple unique ID
      name: newQuestion.questionName,
      link: newQuestion.questionLink,
      difficulty: newQuestion.questionDifficulty,
      rating: parseInt(newQuestion.questionRating, 10),
      completed: newQuestion.questionStatus,
      revision: newQuestion.questionRevision,
      companies: newCompanies,
      sections: [sectionKey],
    };

    const newQuestionSet = {
      ...currentQuestionSet,
    };

    newQuestionSet[questionId] = newQuestionObject;
    currentSetQuestionSet(newQuestionSet);
    updateCalendarActivity(
      calendarData,
      activityCalendarData,
      setCalendarData,
      setActivityCalendarData
    );

    localStorage.setItem(currentQuestionKey, JSON.stringify(newQuestionSet));

    setSectionData(cloneDeep(updatedSectionData));
    localStorage.setItem(currentSectionKey, JSON.stringify(updatedSectionData));
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
        <div className="sticky top-0 bg-gray-900 rounded-t-3xl border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Add New Question
                </h2>
                <p className="text-sm text-gray-400">
                  Create a new coding challenge entry
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

            {/* Difficulty */}
            <div className="space-y-2">
              <label
                htmlFor="questionSection"
                className="block text-sm font-semibold text-gray-300"
              >
                Question Section
                <span className="text-red-500">*</span>
              </label>
              <select
                id="questionSection"
                name="questionSection"
                value={formData.questionSection}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border text-white border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-gray-800`}
              >
                {Reflect.ownKeys(questionSectionsData)?.map((key) => (
                  <option
                    key={questionSectionsData[key].id}
                    value={questionSectionsData[key].id}
                  >
                    {questionSectionsData[key].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Name */}
            <div className="space-y-2">
              <label
                htmlFor="questionName"
                className="block text-sm font-semibold text-gray-300"
              >
                Question Name
              </label>
              <input
                type="text"
                id="questionName"
                name="questionName"
                value={formData.questionName}
                onChange={handleInputChange}
                required
                placeholder="Enter the question title..."
                className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500 bg-gray-800"
              />
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
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
