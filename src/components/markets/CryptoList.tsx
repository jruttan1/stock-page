import { Card } from "@/components/ui/card";

export const CryptoList = () => {
  // Mockup data - in a real app this would come from an API
  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", price: 43521.34, change: 2.45, volume: "12.5B" },
    { symbol: "ETH", name: "Ethereum", price: 2284.67, change: -1.12, volume: "8.2B" },
    { symbol: "BNB", name: "Binance Coin", price: 308.45, change: 0.78, volume: "1.4B" },
    { symbol: "SOL", name: "Solana", price: 98.23, change: 5.67, volume: "2.1B" },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: -0.34, volume: "1.8B" },
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
        {cryptos.map((crypto) => (
          <div
            key={crypto.symbol}
            className="grid grid-cols-5 items-center p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="font-mono font-medium text-blue-600">{crypto.symbol}</div>
            <div className="text-gray-900">{crypto.name}</div>
            <div className="text-right font-mono">
              ${crypto.price < 1 ? crypto.price.toFixed(3) : crypto.price.toFixed(2)}
            </div>
            <div className={`text-right font-mono ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change}%
            </div>
            <div className="text-right text-gray-500">{crypto.volume}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};