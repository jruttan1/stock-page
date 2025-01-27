import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const StockList = () => {
  // Mockup data - in a real app this would come from an API
  const defaultStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.84, change: 2.34, volume: "45.2M" },
    { symbol: "MSFT", name: "Microsoft", price: 338.11, change: -1.23, volume: "22.1M" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 125.23, change: 0.87, volume: "18.5M" },
    { symbol: "AMZN", name: "Amazon.com", price: 127.74, change: -0.45, volume: "32.7M" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 411.17, change: 5.67, volume: "28.9M" },
  ];

  const [stocks, setStocks] = useState(() => {
    const saved = localStorage.getItem('customStocks');
    return saved ? JSON.parse(saved) : defaultStocks;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteStocks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName] = useState("");

  const toggleFavorite = (symbol: string) => {
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(s => s !== symbol)
      : [...favorites, symbol];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteStocks', JSON.stringify(newFavorites));
  };

  const removeStock = (symbol: string) => {
    const updatedStocks = stocks.filter(stock => stock.symbol !== symbol);
    setStocks(updatedStocks);
    localStorage.setItem('customStocks', JSON.stringify(updatedStocks));
    
    // Also remove from favorites if it was favorited
    if (favorites.includes(symbol)) {
      const newFavorites = favorites.filter(s => s !== symbol);
      setFavorites(newFavorites);
      localStorage.setItem('favoriteStocks', JSON.stringify(newFavorites));
    }
    
    toast.success("Stock removed successfully!");
  };

  const addNewStock = () => {
    if (!newSymbol || !newName) {
      toast.error("Please fill in both symbol and name");
      return;
    }

    const newStock = {
      symbol: newSymbol.toUpperCase(),
      name: newName,
      price: Math.random() * 1000, // Mock price
      change: (Math.random() * 10) - 5, // Mock change
      volume: `${Math.floor(Math.random() * 100)}M`, // Mock volume
    };

    const updatedStocks = [...stocks, newStock];
    setStocks(updatedStocks);
    localStorage.setItem('customStocks', JSON.stringify(updatedStocks));
    setNewSymbol("");
    setNewName("");
    toast.success("Stock added successfully!");
  };

  // Filter stocks to show favorites first
  const sortedStocks = [...stocks].sort((a, b) => {
    const aFav = favorites.includes(a.symbol) ? -1 : 1;
    const bFav = favorites.includes(b.symbol) ? -1 : 1;
    return aFav - bFav;
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Symbol (e.g. AAPL)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="w-32"
          />
          <Input
            placeholder="Name (e.g. Apple Inc.)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addNewStock}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>

        <div className="grid grid-cols-7 text-sm font-medium text-gray-500 p-2">
          <div>Favorite</div>
          <div>Symbol</div>
          <div>Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Volume</div>
          <div className="text-right">Actions</div>
        </div>
        {sortedStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="grid grid-cols-7 items-center p-2 hover:bg-gray-50 rounded-lg"
          >
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(stock.symbol)}
                className={favorites.includes(stock.symbol) ? "text-yellow-500" : "text-gray-400"}
              >
                <Star className="h-4 w-4" fill={favorites.includes(stock.symbol) ? "currentColor" : "none"} />
              </Button>
            </div>
            <div className="font-mono font-medium text-blue-600">{stock.symbol}</div>
            <div className="text-gray-900">{stock.name}</div>
            <div className="text-right font-mono">${stock.price.toFixed(2)}</div>
            <div className={`text-right font-mono ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change}%
            </div>
            <div className="text-right text-gray-500">{stock.volume}</div>
            <div className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStock(stock.symbol)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};