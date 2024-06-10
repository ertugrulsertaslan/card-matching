import React from "react";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !card.matched) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative w-24 h-36 perspective">
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped || card.matched ? "rotate-y-180" : ""
        }`}
      >
        <img
          className="w-full h-full absolute backface-hidden"
          onClick={handleClick}
          src={flipped || card.matched ? card.src : "./card-back-blue.png"}
          alt="card back"
        />
        <img
          className="w-full h-full absolute backface-hidden rotate-y-180"
          src={card.src}
          alt="card front"
        />
      </div>
    </div>
  );
}
