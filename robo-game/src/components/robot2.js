import React,{useEffect} from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot2Health, selectTurn, selectGameMode } from '../redux/robot/robot.selectors'
import { setRobot1Health, setTurn } from '../redux/robot/robot.actions'
import { sendAction1, sendAction2, sendTurn,  } from '../sockets/sockets'

import './robot.css'

function Robot2({playerNames,robot2Health, setRobot1Health,setTurn,turn,checkWinner,gameMode,robo2Turn,room
, setRobot2Health}) {
    useEffect(() =>{
        checkWinner()
    },[setRobot1Health,checkWinner])



const onAttack = async(value) => {
    setRobot1Health(value)
    setTurn('player1')
    } 

const onHealth = async(value) => {
    setRobot2Health(value)
    setTurn('player1')
    } 

const onSocketAttack = async(value) => {  
    sendTurn('player1',room)
    sendAction1(value,room)
}

const onSocketHealth = async(value) => {  
    sendTurn('player1',room)
    sendAction2(value,room)
}
      
    return (
        <div>
            <span id ='robot-health'>health: {robot2Health}</span>
            <img src={`https://robohash.org//${playerNames.player2}`} />
            <span id ='robot-name'>player2: {playerNames.player2}</span>
        
        {gameMode === 'singleplayer'
        ?<div>
            {turn === 'player2'
            
            ?<div>
            <button onClick = {()=> onAttack(Math.floor((Math.random() * -15) + -20))} >laser</button>
            <button onClick={()=> onAttack(Math.floor((Math.random() * -10) + -15))}>rocket</button>
            <button onClick = {()=> onHealth(Math.floor((Math.random() * 5) + 15))} >shield</button>
            </div>
            : null}
        </div>
           : null}

        {gameMode === 'multiplayer'
        ?<div>
            {turn === robo2Turn
            
            ?<div>
            <button onClick = {()=> onSocketAttack(Math.floor((Math.random() * -15) + -25))} >laser</button>
            <button onClick = {()=> onSocketAttack(Math.floor((Math.random() * -5) + -20))} >rocket</button>
            <button onClick = {()=> onSocketHealth(Math.floor((Math.random() * 5) + 15))} >shield</button>
            </div>
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