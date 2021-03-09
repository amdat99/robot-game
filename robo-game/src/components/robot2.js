import React,{useEffect} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot2Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'
import { setRobot1Health, setTurn } from '../redux/robot/robot.actions'
import { sendAction1, enterTurn, sendTurn, enterAction1, disconnectSocket,initiateSocket  } from '../sockets/sockets'

function Robot2({playerNames,robot2Health, setRobot1Health,setTurn,turn,checkWinner,gameMode,robo2Turn,room}) {
    useEffect(() =>{
        checkWinner()
    },[setRobot1Health,checkWinner])

//     useEffect(() => {

//             if (room) initiateSocket(room); 
            
//             enterTurn(( data) => {
//             setTurn( data)
//       });

//       return () => {
//         disconnectSocket();
//       }

// } )

const onAttack = async(value) => {
        setRobot1Health(value)
        setTurn('player1')
       
    } 

    const onSocketAttack = async(value) => {  
        sendTurn('player1',room)
        sendAction1(value,room)
      
 


    }
      
    return (
        <div>
            <span>health: {robot2Health}</span>
            <img src={`https://robohash.org//${playerNames.player2}`} />
            <span>player2: {playerNames.player2}</span>
        
        {gameMode === 'singleplayer'
        ?<div>
            {turn === 'player2'
            ?<button onClick = {()=> onAttack(Math.floor((Math.random() * -15) + -20))} >laser</button>
            : null}
        </div>
           : null}

        {gameMode === 'multiplayer'
        ?<div>
            {turn === robo2Turn
            ?<button onClick = {()=> onSocketAttack(Math.floor((Math.random() * -5) + -10))} >laser</button>
            : null}
        </div>
           : null}
        </div>
    );
}

const mapStateToProps = (createStructuredSelector) ({
    robot2Health: selectRobot2Health,
    turn: selectTurn,
    gameMode: selectGameMode
})
const mapDispatchToProps = (dispatch) => ({
    setRobot1Health: (value) => dispatch(setRobot1Health(value)),
    setTurn : (player) => dispatch(setTurn(player))
})
export default connect(mapStateToProps,mapDispatchToProps)(Robot2);