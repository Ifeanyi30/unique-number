import React from 'react';
import { Link } from "react-router-dom";
import './play.css';


const StartGame = () => {
    return (
        <div id="container">
            <div id='img'>
                <h3>Unique Number Game</h3>
                <div id='gradient'>
                    <p>With three Chances, Pick the unique number within sixty seconds to win the game.
                    </p>
                    <Link to="/game">
                        <button id='button'>Play</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default StartGame;