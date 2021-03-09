import React, {useEffect} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot1Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'
import { sendAction2, enterTurn, sendTurn, enterAction2, disconnectSocket, initiateSocket  } from '../sockets/sockets'


function Robot1({playerNames,robot1Health, setRobot2Health,turn, setTurn, checkWinner,gameMode,room, robo1Turn }) {

   useEffect(() =>{
       checkWinner()
   },[robot1Health,setRobot2Health,checkWinner])

//    useEffect(() => {

//     if (room) initiateSocket(room); 
//         enterTurn((data) => {
//         setTurn( data)
//   });
//   return () => {
//     disconnectSocket();
//   }

// })

const onAttack = async(value) => {
      setRobot2Health(value)
    setTurn('player2')

    } 

    
    const onSocketAttack = async(value) => { 
        sendTurn('player2',room)
        sendAction2(value,room)
       
 
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

           { gameMode === 'multiplayer'
           ?<div>
            { turn === robo1Turn
            ?<button onClick={()=> onSocketAttack(Math.floor((Math.random() * -5) + -10))}>laser</button>
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