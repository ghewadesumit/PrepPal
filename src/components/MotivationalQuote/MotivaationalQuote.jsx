import { useState, useEffect } from "react";
import * as MotivationQuotes from "../../constants/mockMotivationQuotes";

const MotivaationalQuote = () => {
  // Get today's motivation quote (same quote for the day)
  const [todayQuote, setTodayQuote] = useState(null);

  useEffect(() => {
    // MotivationQuotes is an object, get the array
    const quotesArr = MotivationQuotes.powerFullQuotes || [];
    if (quotesArr.length === 0) return;
    // Use date as seed for quote of the day
    const today = new Date();
    const daySeed =
      today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();
    const idx = daySeed % quotesArr.length;
    setTodayQuote(quotesArr[idx]);
  }, []);
  if (!todayQuote) {
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto mt-2 mb-2 px-2 py-2 rounded-2xl  shadow-lg  flex flex-col items-center">
      <p className="text-lg text-white text-center font-medium italic mb-2">
        “{todayQuote.quote}”
      </p>
      <span className="text-sm text-gray-400 text-center">
        — {todayQuote.quoteauthor}
      </span>
    </div>
  );
};

export default MotivaationalQuote;
