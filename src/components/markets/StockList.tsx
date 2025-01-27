import { Card } from "@/components/ui/card";

export const StockList = () => {
  // Mockup data - in a real app this would come from an API
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.84, change: 2.34, volume: "45.2M" },
    { symbol: "MSFT", name: "Microsoft", price: 338.11, change: -1.23, volume: "22.1M" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 125.23, change: 0.87, volume: "18.5M" },
    { symbol: "AMZN", name: "Amazon.com", price: 127.74, change: -0.45, volume: "32.7M" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 411.17, change: 5.67, volume: "28.9M" },
  ];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-5 text-sm font-medium text-gray-500 p-2">
          <div>Symbol</div>
          <div>Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Volume</div>
        </div>
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="grid grid-cols-5 items-center p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="font-mono font-medium text-blue-600">{stock.symbol}</div>
            <div className="text-gray-900">{stock.name}</div>
            <div className="text-right font-mono">${stock.price.toFixed(2)}</div>
            <div className={`text-right font-mono ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change}%
            </div>
            <div className="text-right text-gray-500">{stock.volume}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};