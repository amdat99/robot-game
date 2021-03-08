import React, {useEffect} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot1Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'
import { sendAction, enterTurn, sendTurn, enterAction, disconnectSocket, initiateSocket  } from '../sockets/sockets'


function Robot1({playerNames,robot1Health, setRobot2Health,turn, setTurn, checkWinner,gameMode,room, robo1Turn }) {

   useEffect(() =>{
       checkWinner()
   },[robot1Health,setRobot2Health,checkWinner])

   useEffect(() => {

    if(gameMode === 'multiplayer'){
    if (room) initiateSocket(room); 
        
    enterTurn((data) => {
        setTurn( data)
  });

  enterAction((err, data) => {
      setRobot2Health(data)
  })


  return () => {
    disconnectSocket();
  
  }
  }
  })


    const onAttack = async(value) => {
      
        setRobot2Health(value)
        setTurn('player2')
    } 

    const onSocketAttack = async(value) => {
      sendAction(value,room)
      sendTurn('player2',room)
    }

    console.log('r', turn)
    console.log(turn,robo1Turn)



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
            ?<button onClick={()=> onSocketAttack(Math.floor((Math.random() * -15) + -20))}>laser</button>
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