import { useState, useEffect } from "react";
import { useQuestionStore } from "../../store/useQuestionStore";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: any;
  selectedNavItem: string;
}

const NotesModal = ({
  isOpen,
  onClose,
  question,
  selectedNavItem,
}: NotesModalProps) => {
  const [notes, setNotes] = useState("");
  const {
    allDsaQuestionsSet,
    allFrontEndQuestionsSet,
    setAllDsaQuestionsSet,
    setAllFrontEndQuestionsSet,
  } = useQuestionStore();

  // Update notes when question changes or modal opens
  useEffect(() => {
    if (question?.notes) {
      setNotes(question.notes);
    } else {
      setNotes("");
    }
  }, [question]);

  if (!isOpen) return null;

  const handleSaveNotes = () => {
    const currentQuestionSet =
      selectedNavItem === "backend"
        ? allDsaQuestionsSet
        : allFrontEndQuestionsSet;
    const setQuestionSet =
      selectedNavItem === "backend"
        ? setAllDsaQuestionsSet
        : setAllFrontEndQuestionsSet;
    const storageKey =
      selectedNavItem === "backend" ? "dsaQuestions" : "frontEndQuestions";

    const updatedQuestion = {
      ...currentQuestionSet[question.id],
      notes,
    };

    const updatedQuestionSet = {
      ...currentQuestionSet,
      [question.id]: updatedQuestion,
    };

    // Save to local storage
    localStorage.setItem(storageKey, JSON.stringify(updatedQuestionSet));

    // Update state
    setQuestionSet(updatedQuestionSet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">
          Notes for {question.name}
        </h2>
        <div className="space-y-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-64 p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Add your notes here..."
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNotes}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
