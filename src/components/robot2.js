import React from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot2Health, selectTurn } from '../redux/robot/robot.selectors'
import { setRobot1Health, setTurn } from '../redux/robot/robot.actions'

function Robot2({playerNames,robot2Health, setRobot1Health,setTurn,turn,checkWinner}) {
    
    return (
        <div>
            <span>health: {robot2Health}</span>
            <img src={`https://robohash.org//${playerNames.player2}`} />
            <span>player2: {playerNames.player2}</span>
            {turn === 'player2'
            ?<button onClick = {()=> {setRobot1Health(-20); setTurn('player1'); checkWinner()  }} >laser</button>
            : null}
        </div>
    );
}

const mapStateToProps = (createStructuredSelector) ({
    robot2Health: selectRobot2Health,
    turn: selectTurn
})
const mapDispatchToProps = (dispatch) => ({
    setRobot1Health: (value) => dispatch(setRobot1Health(value)),
    setTurn : (player) => dispatch(setTurn(player))
})
export default connect(mapStateToProps,mapDispatchToProps)(Robot2);