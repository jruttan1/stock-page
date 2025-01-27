import { Card } from "@/components/ui/card";

export const FearGreedIndex = () => {
  // Mockup data - in a real app this would come from an API
  const fearGreedValue = 65;
  const sentiment = fearGreedValue > 50 ? "Greed" : "Fear";
  const getColor = (value: number) => {
    if (value >= 75) return "text-green-600";
    if (value >= 50) return "text-green-500";
    if (value >= 25) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fear & Greed Index</h2>
          <p className="text-sm text-gray-500">Market Sentiment Indicator</p>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold ${getColor(fearGreedValue)}`}>
            {fearGreedValue}
          </span>
          <p className={`text-lg font-medium ${getColor(fearGreedValue)}`}>
            {sentiment}
          </p>
        </div>
      </div>
    </Card>
  );
};