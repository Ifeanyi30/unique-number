import React from 'react';
import './SingleCard.css'


const Card = ({ card, handleChoice, flipped }) => {

    const handleClick = () => {
        handleChoice(card);
    }

    return(
        <div className="cd" onClick={handleClick} >
            <div className={flipped ? "cd__inner is-flipped" : "cd__inner"}>
                <div className="cd__face cd__face--front">
                    
                </div>
                <div className="cd__face cd__face--back">
                    {card.value}
                </div>
            </div>
        </div>
    );
}

export default Card;
