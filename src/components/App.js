import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]
function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  //shuffle cards
  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id : Math.random()
      }))
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setWon(false);
      setTurns(0);
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //reset choices & increse turn
  const resetTurn = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  }

  //compare choices
  useEffect(() => {
    if(choiceOne && choiceTwo){
    setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
        return prevCards.map((card) => {
          if(card.src === choiceOne.src){
            return {...card, matched: true}
          }else {
            return card
          }
        })
      })}
      setTimeout(() => resetTurn(), 1000);
      // let isWon = cards.some((card) => card.matched === false);
      // setWon(!isWon);
    }
  }, [choiceOne, choiceTwo])

  //start the Game
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => <SingleCard
          card={card}
          key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled} />
        )}
      </div><p>Turns: {turns}</p>
    </div>
  );
}

export default App;
