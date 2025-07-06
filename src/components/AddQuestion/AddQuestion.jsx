import React, { useState } from "react";
import {
  Plus,
  Link,
  Star,
  Building,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    questionStatus: false,
    questionRevision: false,
    questionName: "",
    questionLink: "",
    questionDifficulty: "easy",
    questionRating: "3",
    questionCompanies: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Add New Question
          </h1>
          <p className="text-gray-600 text-lg">
            Create a new coding challenge entry
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sm:p-10"
        >
          <div className="space-y-8">
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
                  className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.questionStatus
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <CheckCircle
                    className={`w-5 h-5 ${
                      formData.questionStatus
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Completed</span>
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
                  className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.questionRevision
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <RotateCcw
                    className={`w-5 h-5 ${
                      formData.questionRevision
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Needs Revision</span>
                </label>
              </div>
            </div>

            {/* Question Name */}
            <div className="space-y-2">
              <label
                htmlFor="questionName"
                className="block text-sm font-semibold text-gray-700"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Question Link */}
            <div className="space-y-2">
              <label
                htmlFor="questionLink"
                className="block text-sm font-semibold text-gray-700 flex items-center space-x-2"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Difficulty and Rating Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Difficulty */}
              <div className="space-y-2">
                <label
                  htmlFor="questionDifficulty"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Difficulty Level
                </label>
                <select
                  id="questionDifficulty"
                  name="questionDifficulty"
                  value={formData.questionDifficulty}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getDifficultyColor(
                    formData.questionDifficulty
                  )}`}
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
                  className="block text-sm font-semibold text-gray-700 flex items-center space-x-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
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
                className="block text-sm font-semibold text-gray-700 flex items-center space-x-2"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg transition-all duration-200 transform ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding Question...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Question</span>
                </button>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Keep track of your coding interview preparation
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
