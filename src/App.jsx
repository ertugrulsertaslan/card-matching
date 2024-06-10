import React, { useState, useEffect } from "react";
import "./index.css";
import Card from "./Card.jsx";

const cardImages = [
  { src: "./maca-as.png", matched: false },
  { src: "./kral-kupa.png", matched: false },
  { src: "./kupa-kizi.png", matched: false },
  { src: "./karo-5.png", matched: false },
  { src: "./sinek-8.png", matched: false },
  { src: "./joker-maca.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setTimeout(() => {
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.src === choiceOne.src || c.src === choiceTwo.src
                ? { ...c, matched: true }
                : c
            )
          );
        }
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
      }, 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Card Matching Game</h1>
      <button
        onClick={shuffleCards}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        New Game
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {gameOver && <p className="mt-4 text-lg">Congratulations! You win!</p>}
      <p className="mt-4 text-lg">Turns: {turns}</p>
    </div>
  );
}

export default App;
