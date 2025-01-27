import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CryptoList = () => {
  const defaultCryptos = [
    { symbol: "BTC", name: "Bitcoin", price: 43521.34, change: 2.45, volume: "12.5B" },
    { symbol: "ETH", name: "Ethereum", price: 2284.67, change: -1.12, volume: "8.2B" },
    { symbol: "BNB", name: "Binance Coin", price: 308.45, change: 0.78, volume: "1.4B" },
    { symbol: "SOL", name: "Solana", price: 98.23, change: 5.67, volume: "2.1B" },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: -0.34, volume: "1.8B" },
  ];

  const [cryptos, setCryptos] = useState(() => {
    const saved = localStorage.getItem('customCryptos');
    return saved ? JSON.parse(saved) : defaultCryptos;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteCryptos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName] = useState("");

  const toggleFavorite = (symbol: string) => {
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(s => s !== symbol)
      : [...favorites, symbol];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCryptos', JSON.stringify(newFavorites));
  };

  const addNewCrypto = () => {
    if (!newSymbol || !newName) {
      toast.error("Please fill in both symbol and name");
      return;
    }

    const newCrypto = {
      symbol: newSymbol.toUpperCase(),
      name: newName,
      price: Math.random() * 1000, // Mock price
      change: (Math.random() * 10) - 5, // Mock change
      volume: `${Math.floor(Math.random() * 100)}B`, // Mock volume
    };

    const updatedCryptos = [...cryptos, newCrypto];
    setCryptos(updatedCryptos);
    localStorage.setItem('customCryptos', JSON.stringify(updatedCryptos));
    setNewSymbol("");
    setNewName("");
    toast.success("Cryptocurrency added successfully!");
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
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Symbol (e.g. BTC)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="w-32"
          />
          <Input
            placeholder="Name (e.g. Bitcoin)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addNewCrypto}>
            <Plus className="h-4 w-4 mr-2" />
            Add Crypto
          </Button>
        </div>

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