import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CoinFlipSimulator() {
  const [netWorth, setNetWorth] = useState(100); // Starting with $100
  const [solWorth, setSolWorth] = useState(1); // Starting with 1 SOL
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const flipCoin = () => {
    if (gameOver) return;

    const isHeads = Math.random() < 0.5;
    const changeUSD = isHeads ? netWorth : -0.6 * netWorth;
    const changeSOL = isHeads ? solWorth : -0.6 * solWorth;

    const newNetWorth = netWorth + changeUSD;
    const newSolWorth = solWorth + changeSOL;

    if (newNetWorth <= 0 || newSolWorth <= 0) {
      setGameOver(true);
    }

    setNetWorth(newNetWorth);
    setSolWorth(newSolWorth);
    setHistory([
      ...history,
      {
        result: isHeads ? "Heads (Gain 100%)" : "Tails (Lose 60%)",
        changeUSD: changeUSD.toFixed(2),
        changeSOL: changeSOL.toFixed(4),
        netWorth: newNetWorth.toFixed(2),
        solWorth: newSolWorth.toFixed(4),
      },
    ]);
  };

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold">Coin Flip Net Worth Simulator</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="text-lg">Current Net Worth: ${netWorth.toFixed(2)}</div>
          <div className="text-lg">Current SOL: {solWorth.toFixed(4)} SOL</div>
          <Button onClick={flipCoin}>Flip Coin</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold">History</h2>
        <ul className="mt-2 space-y-1">
          {history.map((entry, index) => (
            <li key={index} className="text-sm">
              Flip {index + 1}: {entry.result} | Change: ${entry.changeUSD} / {entry.changeSOL} SOL | 
              New Net Worth: ${entry.netWorth} | New SOL: {entry.solWorth} SOL
            </li>
          ))}
        </ul>
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-pulse">
          <h1 className="text-red-600 text-6xl font-bold" style={{ fontFamily: 'monospace', textShadow: '0 0 10px red' }}>
            GAME OVER
          </h1>
        </div>
      )}
    </div>
  );
}
