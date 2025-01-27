import { useState } from "react";
import { FearGreedIndex } from "@/components/markets/FearGreedIndex";
import { StockList } from "@/components/markets/StockList";
import { CryptoList } from "@/components/markets/CryptoList";
import { NewsSection } from "@/components/markets/NewsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Markets = () => {
  const [activeTab, setActiveTab] = useState("stocks");

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Markets</h1>
      
      <div className="mb-8">
        <FearGreedIndex />
      </div>

      <Tabs defaultValue="stocks" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks">
          <StockList />
        </TabsContent>
        <TabsContent value="crypto">
          <CryptoList />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <NewsSection />
      </div>
    </div>
  );
};

export default Markets;