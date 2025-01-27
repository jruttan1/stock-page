import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  sourceUrl: string;
  time: string;
  category: string;
}

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Fed Signals Potential Rate Cuts in 2024",
      source: "Financial Times",
      sourceUrl: "https://www.ft.com",
      time: "2 hours ago",
      category: "Economy",
    },
    {
      id: 2,
      title: "Apple Announces New AI Integration for iPhone",
      source: "Bloomberg",
      sourceUrl: "https://www.bloomberg.com",
      time: "4 hours ago",
      category: "Technology",
    },
    {
      id: 3,
      title: "Bitcoin Surges Past Key Resistance Level",
      source: "CoinDesk",
      sourceUrl: "https://www.coindesk.com",
      time: "5 hours ago",
      category: "Crypto",
    },
  ]);

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Market News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <div 
              onClick={() => handleNewsClick(item.sourceUrl)}
              className="group cursor-pointer"
            >
              <h3 className="text-blue-600 font-medium group-hover:text-blue-700 flex items-center gap-2">
                {item.title}
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="hover:text-blue-600 transition-colors">
                  {item.source}
                </span>
                <span>•</span>
                <span>{item.time}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};