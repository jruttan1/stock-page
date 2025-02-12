
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

  const getIndicatorColor = (value: number) => {
    if (value >= 75) return "bg-green-600";
    if (value >= 50) return "bg-green-500";
    if (value >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
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
        
        <div className="space-y-2">
          <div className="relative">
            <Progress 
              value={fearGreedValue} 
              className={cn("h-4", getIndicatorColor(fearGreedValue))}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Extreme Fear</span>
            <span>Fear</span>
            <span>Neutral</span>
            <span>Greed</span>
            <span>Extreme Greed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
