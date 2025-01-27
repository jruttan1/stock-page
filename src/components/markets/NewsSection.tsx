import { Card } from "@/components/ui/card";

export const NewsSection = () => {
  // Mockup data - in a real app this would come from an API
  const news = [
    {
      id: 1,
      title: "Fed Signals Potential Rate Cuts in 2024",
      source: "Financial Times",
      time: "2 hours ago",
      category: "Economy",
    },
    {
      id: 2,
      title: "Apple Announces New AI Integration for iPhone",
      source: "Bloomberg",
      time: "4 hours ago",
      category: "Technology",
    },
    {
      id: 3,
      title: "Bitcoin Surges Past Key Resistance Level",
      source: "CoinDesk",
      time: "5 hours ago",
      category: "Crypto",
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Market News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <h3 className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer">
              {item.title}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{item.source}</span>
              <span>•</span>
              <span>{item.time}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};