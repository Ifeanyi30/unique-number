import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import Card from './components/card';
import Timer from './components/timer';
import { Link } from "react-router-dom";
import './App.css';


let commonNumber = parseInt(Math.random() * 10);

let uniqueNumber = parseInt(Math.random() * 10);

while (uniqueNumber === commonNumber) {
    uniqueNumber = parseInt(Math.random() * 10);
}

let cardValues = Array(9).fill(commonNumber);
cardValues.push(uniqueNumber)

const shuffled = [...cardValues].sort(() => Math.random() - 0.5)
    .map((num) => ({ value: num, id: Math.random(), isFlipped: false }) );


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.display}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Would You Like to Play again?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => {window.location.reload(true);}} >Yes</Button>{' '}
        <Link to="/">
          <Button variant="danger">No</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}


const App = () => {
  const [cards, setCards] = useState(shuffled);
  const [choiceOne, setChoiceOne] = useState(null);
  const [pick, setPick] = useState(0)
  const [modalShow, setModalShow] = useState({set:false, display: ''});
  const [isUnique, setIsUnique] = useState(false);
  const [remainTime, setRemainTime] = useState({
    minutes: '01',
    seconds: '00'
  })
  const [countdown, setCountdown] = useState(59);
  let intervalid = useRef(null);

  const handleChoice = (card) => {
    setChoiceOne(card);
    setPick(pick => (pick + 1));
    if (card.value === uniqueNumber){
      setIsUnique(true);
    }
  }

  const startTimer = useCallback(() => {
    
    intervalid.current = setInterval(() => {
      setCountdown(countdown - 1);
      setRemainTime({minutes: '00', seconds: (`${countdown}`).length === 1 ? `0${countdown}`: `${countdown}`})
      
      if (countdown <= 0) {
        return clearInterval(intervalid.current);
      }
    }, 1000);
  }, [countdown])

  useEffect(() => {
    if (choiceOne && pick <= 3 && countdown !== 0){
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.id === choiceOne.id){
            return {value: card.value, id: card.id, isFlipped: true};
          } else {
            return card;
          }
        })
      })
      setChoiceOne(null);
      if (isUnique){
        setModalShow({set: true, display: 'Hurray!!! You Win'});
      }else if (!isUnique && pick === 3){
        setModalShow({set: true, display: 'Sorry! You Lose'});
      }
    } else if (countdown === 0){
      setModalShow({set: true, display: 'Sorry! You Lose'});
    }
    startTimer();
    return () => clearInterval(intervalid.current);
  }, [choiceOne, pick, isUnique, startTimer, countdown])

  

  return (
    <div className="App">
      <div id="hd">
        <div id="hder">
        <h1>The Unique Number is:&nbsp;</h1>
         <span id="uniqueNumber">{uniqueNumber} </span>
      </div>
      <Timer
      minutes={remainTime.minutes}
      seconds={remainTime.seconds}
      />
      </div>
      
      <div className="c-g">
        {cards.map(card =>(
        <Card
        key={card.id}
        card={card}
        handleChoice={handleChoice}
        flipped={card.isFlipped }
        />
      ))}
      </div>
      {modalShow.set ? <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        display={modalShow.display}
      />: null}
    </div>
  );
}

export default App;