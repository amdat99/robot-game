import React, {useEffect,useState} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot1Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'
import { sendAction2,  sendTurn, sendAction1 } from '../sockets/sockets'

import './robot.css'


function Robot1({playerNames,robot1Health, setRobot2Health,turn, setTurn, checkWinner,gameMode,room, robo1Turn
,setRobot1Health }) {

const [animation, setAnimation] = useState({1: false, 2: false, 3: false})


useEffect(() =>{
       checkWinner()
   },[robot1Health,setRobot2Health,checkWinner])


const onAttack = async(value) => {
      setRobot2Health(value)
    setTurn('player2')
} 

const onHealth = async(value) => {
    setRobot1Health(value)
  setTurn('player2')
} 

    
const onSocketAttack = async(value) => { 
    sendTurn('player2',room)
    sendAction2(value,room)
    }

const onSocketHealth = (value) => {
    sendTurn('player2',room)
    sendAction1(value,room)
   }

   
   const startAnimation = (type)=>{
    setAnimation(type)
    setInterval(function(){ setAnimation({type:false}) }, 100);


}


return (
        <div> 
       
            <div id ={animation.laser? 'laser1' : null}></div>
       
            <span id="robot-health">health: {robot1Health}</span>
           <img src={`https://robohash.org//${playerNames.player1}`} />
           
           <span id="robot-name">player1: {playerNames.player1}</span>

           { gameMode === 'singleplayer'
           ?<div>
            { turn === 'player1'
            ?<div>
            <button onClick={()=>{ onAttack(Math.floor((Math.random() * -15) + -20)); 
                     startAnimation({laser:true})} }>laser</button>
            
            <button onClick={()=> {onAttack(Math.floor((Math.random() * -5) + -25));
                     startAnimation(2)}} >rocket</button>
            
            <button onClick = {()=> {onHealth(Math.floor((Math.random() * 5) + 10));
                    startAnimation(3)}} >shield</button>
            </div>
            :null}
            </div>
           : null}

           { gameMode === 'multiplayer'
           ?<div>
            { turn === robo1Turn
            ?<div>
            <button onClick={()=>{ onSocketAttack(Math.floor((Math.random() * -15) + -20)); 
                    startAnimation({laser:true})} }>laser</button>
            
            <button onClick={()=> {onSocketAttack(Math.floor((Math.random() * -5) + -25));
                      startAnimation(2)} }>rocket</button>
            
            <button onClick = {()=> {onSocketHealth(Math.floor((Math.random() * 5) + 10));
                     startAnimation(3)} }>shield</button>
            </div>
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