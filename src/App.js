import React,{useState,useEffect} from 'react'
import Robot1 from './components/robot1'
import Robot2 from './components/robot2'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot2Health, selectRobot1Health } from './redux/robot/robot.selectors'
import { setRobot2Health, setRobot1Health, setTurn,setGameMode} from './redux/robot/robot.actions'
import './App.css';

function App({robot1Health, robot2Health, setTurn,setRobot2Health, setRobot1Health,setGameMode}) {
const [player1Name, setPlayer1Name] = useState('')
const [player2Name, setPlayer2Name] = useState('')
const [playerNames, setPlayerNames ] = useState({player1:'',player2:''})

const setPlayer1 = () => {
  setPlayerNames({...playerNames,player1:player1Name})
}

const setPlayer2 = () => {
  setPlayerNames({...playerNames,player2:player2Name})
}

const checkWinner = () => {
  if( robot1Health <= 0){
    // setPlayerNames({player1:'', player2:''})
    // setPlayer1Name('') 
    // setPlayer2Name('')
    setGameMode('')
    alert('Winner player 2')

    
  
  } else if( robot2Health <= 0){
    // setPlayerNames({player1:'', player2:''})
    // setPlayer1Name('')
    // setPlayer2Name('')
    setGameMode('')
    alert('Winner player 1')
 
}
}

const initialiseGameMode = (mode) => {
  setGameMode(mode)
}
  
  return (
    <div className="App">

    <div>
   
    <button onClick ={() => initialiseGameMode('singleplayer')}>Single Player</button>
    <button onClick ={() => initialiseGameMode('multiplayer')}>Multiplayer</button>
   
    {/* <button></button> */}
      
      <input type="text" placeholder="enter name player1" onChange={ (e) => setPlayer1Name(e.target.value) }/>
      <button onClick={setPlayer1}>setPlayer1Name</button>
      
      <input type="text" placeholder="enter name player2" onChange={ (e) => setPlayer2Name(e.target.value) }/>
      <button onClick={setPlayer2}>setPlayer2Name</button>    
      </div>

      {playerNames.player1 ?
        <div>
        <Robot1 playerNames = {playerNames} checkWinner={checkWinner} setRobot2Health={setRobot2Health} setTurn={setTurn}/>
        </div>
     :null }
      
     {playerNames.player2 ?
        <div>
          <Robot2 playerNames = {playerNames} checkWinner={checkWinner} robot1Health = {robot1Health} setTurn = {setTurn}/>
        </div>
     :null }
    </div>
  );
}

const mapStateToProps = (createStructuredSelector) ({
  robot1Health : selectRobot1Health,
  robot2Health : selectRobot2Health
})

const mapDispatchToProps = (dispatch) => ({
  setRobot2Health: (value) => dispatch(setRobot2Health(value)),
  setRobot1Health: (value) => dispatch(setRobot1Health(value)),
  setTurn : (player) => dispatch(setTurn(player)),
  setGameMode: (mode) => dispatch(setGameMode(mode))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
