import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

export const CryptoList = () => {
  // Mockup data - in a real app this would come from an API
  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", price: 43521.34, change: 2.45, volume: "12.5B" },
    { symbol: "ETH", name: "Ethereum", price: 2284.67, change: -1.12, volume: "8.2B" },
    { symbol: "BNB", name: "Binance Coin", price: 308.45, change: 0.78, volume: "1.4B" },
    { symbol: "SOL", name: "Solana", price: 98.23, change: 5.67, volume: "2.1B" },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: -0.34, volume: "1.8B" },
  ];

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteCryptos');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (symbol: string) => {
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(s => s !== symbol)
      : [...favorites, symbol];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCryptos', JSON.stringify(newFavorites));
  };

  // Filter cryptos to show favorites first
  const sortedCryptos = [...cryptos].sort((a, b) => {
    const aFav = favorites.includes(a.symbol) ? -1 : 1;
    const bFav = favorites.includes(b.symbol) ? -1 : 1;
    return aFav - bFav;
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-6 text-sm font-medium text-gray-500 p-2">
          <div>Favorite</div>
          <div>Symbol</div>
          <div>Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Volume</div>
        </div>
        {sortedCryptos.map((crypto) => (
          <div
            key={crypto.symbol}
            className="grid grid-cols-6 items-center p-2 hover:bg-gray-50 rounded-lg"
          >
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(crypto.symbol)}
                className={favorites.includes(crypto.symbol) ? "text-yellow-500" : "text-gray-400"}
              >
                <Star className="h-4 w-4" fill={favorites.includes(crypto.symbol) ? "currentColor" : "none"} />
              </Button>
            </div>
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