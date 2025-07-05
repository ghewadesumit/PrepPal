import React from "react";

const AddQuestion = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add a New Question
      </h2>
      <form className="space-y-5">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="questionStatus"
            name="questionStatus"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="questionStatus" className="text-gray-700">
            Completed
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="questionRevision"
            name="questionRevision"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="questionRevision" className="text-gray-700">
            Revision
          </label>
        </div>
        <div>
          <label htmlFor="questionName" className="block text-gray-700 mb-1">
            Question Name:
          </label>
          <input
            type="text"
            id="questionName"
            name="questionName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="questionLink" className="block text-gray-700 mb-1">
            Question Link:
          </label>
          <input
            type="url"
            id="questionLink"
            name="questionLink"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label
            htmlFor="questionDifficulty"
            className="block text-gray-700 mb-1"
          >
            Difficulty
          </label>
          <select
            id="questionDifficulty"
            name="questionDifficulty"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="questionRating" className="block text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="questionRating"
            name="questionRating"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="questionCompanies"
            className="block text-gray-700 mb-1"
          >
            Companies
          </label>
          <input
            type="url"
            id="questionCompanies"
            name="questionCompanies"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};
export default AddQuestion;
