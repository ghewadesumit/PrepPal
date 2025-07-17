const ProgressBar = ({
  label,
  value,
  max,
  color,
  reverse = false,
  showZeroGood = false,
}) => {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  const displayValue = reverse ? max - value : value;
  const displayPercent =
    reverse && max > 0 ? Math.round(((max - value) / max) * 100) : percent;
  const barColor = color || "bg-blue-600";
  const bgColor = "bg-gray-700";
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-200">{label}</span>
        <span className="text-sm font-medium text-gray-400">
          {reverse && showZeroGood && value === 0 ? (
            <span className="text-green-400 font-semibold">Good!</span>
          ) : (
            `${displayValue} / ${max}`
          )}
        </span>
      </div>
      <div className={`w-full h-4 ${bgColor} rounded-full overflow-hidden`}>
        <div
          className={`${barColor} h-4 transition-all duration-500`}
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
