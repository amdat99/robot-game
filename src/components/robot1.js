import React from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot1Health, selectTurn } from '../redux/robot/robot.selectors'


function Robot1({playerNames,robot1Health, setRobot2Health,turn, setTurn, checkWinner }) {


    return (
        <div> 
            <span>health: {robot1Health}</span>
           <img src={`https://robohash.org//${playerNames.player1}`} />
           <span>player1: {playerNames.player1}</span>
            { turn === 'player1'
            ?<button onClick={()=> {setRobot2Health(-20); setTurn('player2'); checkWinner() }}>laser</button>
           
            :null}
        </div>
    );
}

const mapStateToProps = (createStructuredSelector) ({
    robot1Health: selectRobot1Health,
    turn: selectTurn
})



export default connect(mapStateToProps)(Robot1);