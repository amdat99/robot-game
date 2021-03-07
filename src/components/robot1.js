import React, {useEffect} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot1Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'


function Robot1({playerNames,robot1Health, setRobot2Health,turn, setTurn, checkWinner,gameMode }) {

   useEffect(() =>{
       checkWinner()
   },[setRobot2Health,checkWinner])

    const onAttack = async(value) => {
        setRobot2Health(value)
        setTurn('player2')
        
    } 

    return (
        <div> 
            <span>health: {robot1Health}</span>
           <img src={`https://robohash.org//${playerNames.player1}`} />
           <span>player1: {playerNames.player1}</span>

           { gameMode === 'singleplayer'
           ?<div>
            { turn === 'player1'
            ?<button onClick={()=> onAttack(Math.floor((Math.random() * -15) + -20))}>laser</button>
           
            :null}
            </div>
           : null}
        </div>
    );
}

const mapStateToProps = (createStructuredSelector) ({
    robot1Health: selectRobot1Health,
    turn: selectTurn,
    gameMode: selectGameMode
})



export default connect(mapStateToProps)(Robot1);