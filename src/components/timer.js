import React from 'react';
import './timer.css';

const Timer = (props) => {

    return (
        <div id='timer'>
            <section >
                <p>{props.minutes}</p>
                <p><small>mins</small></p>
            </section>
            <section >
                <p >:</p>
                <p>&nbsp;</p>
            </section>
            <section >
                <p>{props.seconds}</p>
                <p><small>secs</small></p>
            </section>
        </div>
    );
}

export default Timer;