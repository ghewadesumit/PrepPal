// Modal component
const RelatedQuestionsModal = ({
  isOpen,
  onClose,
  questions,
  allQuestionsSet,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-white">Related Questions</h2>
        {questions.length === 0 ? (
          <div className="text-gray-400">No related questions found.</div>
        ) : (
          <ul className="space-y-2">
            {questions.map((qId) => (
              <li key={qId}>
                <a
                  href={allQuestionsSet[qId]?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline hover:text-blue-300"
                >
                  {allQuestionsSet[qId]?.name || "Question not found"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RelatedQuestionsModal;
