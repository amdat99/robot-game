import React,{useState,useEffect} from 'react'



import Robot1 from './components/robot1'
import Robot2 from './components/robot2'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectRobot2Health, selectRobot1Health ,selectGameMode } from './redux/robot/robot.selectors'
import { setRobot2Health, setRobot1Health,setTurn,setGameMode} from './redux/robot/robot.actions'
import { initiateSocket, enterName, enterTurn,enterAction1, enterAction2, sendName, disconnectSocket} from './sockets/sockets'
import './App.css';


function App({robot1Health, robot2Health, setTurn,setRobot2Health, setRobot1Health,setGameMode, gameMode}) {
const [player1Name, setPlayer1Name] = useState('')
const [player2Name, setPlayer2Name] = useState('')
const [playerNames, setPlayerNames ] = useState({player1:'',player2:''})
const [rooms, setRooms] = useState([1,2,3]);
const [room, setRoom] = useState(rooms[0]);
const [robo1Turn, setrobo1Turn] = useState('')
const [robo2Turn, setrobo2Turn] = useState('')

useEffect(() => {
  
 if (room) initiateSocket(room);  
 
   enterName((err, data) => {
   
  if(player1Name) {
    setPlayerNames({...playerNames,player2:data})
    setrobo1Turn('player1')
  } else{
    setPlayerNames({...playerNames,player1:data})
    setrobo2Turn('player2')
  }
});

enterTurn((err,data) => {
  setTurn( data)
    });

  enterAction2((err, data) => {
  setRobot2Health(data)
  console.log(data)
})


enterAction1((err, data) => {
  setRobot1Health(data)
  console.log(data)
})


return () => {
   disconnectSocket();
 }

}
)



const setPlayer1 = () => {
  if(player1Name){
  setPlayerNames({...playerNames,player1:player1Name})
  }
}

const setPlayer2 = () => {
  if(player2Name){
  setPlayerNames({...playerNames,player2:player2Name})
  }
}

const checkWinner = () => {
  if( robot1Health <= 0){
    setGameMode('')
    sendName('')
    setPlayerNames({player1:'',player2:''})
    alert('Winner player 2')

  } else if( robot2Health <= 0){
    setGameMode('')
    sendName('')
    setPlayerNames({player1:'',player2:''})
    alert('Winner player 1')
  }
}

const initialiseGameMode = (mode) => {
 setGameMode(mode)
}

const sendPlayer2Name = () => {
  sendName(player2Name,room)
 }

 const sendPlayer1Name = () => {
  sendName(player1Name,room)
 }

return (
    <div className="App">

    <div>
   
      <button onClick ={() => initialiseGameMode('singleplayer')}>Single Player</button>
      <button onClick ={() => initialiseGameMode('multiplayer')}>Multiplayer</button>
   
      { gameMode === 'singleplayer'
      ?<div>
        <input type="text" placeholder="enter name player1" onChange={ (e) => setPlayer1Name(e.target.value) }/>
          <button onClick={setPlayer1}>setPlayer1Name</button>
          
      
        <input type="text" placeholder="enter name player2" onChange={ (e) => setPlayer2Name(e.target.value) }/>
          <button onClick={setPlayer2}>setPlayer2Name</button> 
      </div>
      : null}   

      { gameMode === 'multiplayer'
      ?<div>
        <span>current room: {room}</span>
     { playerNames.player1 === ''
      ?<div>
         <input type="text" placeholder="enter name player1" onChange={ (e) => setPlayer1Name(e.target.value) }/>
          <button onClick={()=>{setPlayer1(); sendPlayer1Name()}}>setPlayer1Name</button> 
        </div>
      :<div>
         <input type="text" placeholder="enter name player2" onChange={ (e) => setPlayer2Name(e.target.value) }/>
          <button onClick={()=>{setPlayer2(); sendPlayer2Name()}}>setPlayer2Name</button> 
        </div>
     
     }
    
      <span>rooms:</span>
      { 
        rooms.map((room, i) => 
          <button onClick={() => {setRoom(room);   }} key={i}>{room}</button>
        )
      }  
      </div>
      : null}
      </div>

      {playerNames.player1 ?
        <div className ='robot1'>
        <Robot1 playerNames = {playerNames} checkWinner={checkWinner} setRobot2Health={setRobot2Health} setTurn={setTurn} room={room}
          robo1Turn = {robo1Turn} setRobot1Health ={setRobot1Health}
        />
        </div>
     :null }
      
     {playerNames.player2 ?
        <div className ='robot2'>
          <Robot2 playerNames = {playerNames} checkWinner={checkWinner} robot1Health = {robot1Health} setTurn = {setTurn}
            robo2Turn = {robo2Turn} setRobot2Health ={setRobot2Health}
          />
        </div>
     :null }
    </div>
  );
}

const mapStateToProps = (createStructuredSelector) ({
  robot1Health : selectRobot1Health,
  robot2Health : selectRobot2Health,
  gameMode: selectGameMode
})

const mapDispatchToProps = (dispatch) => ({
  setRobot2Health: (value) => dispatch(setRobot2Health(value)),
  setRobot1Health: (value) => dispatch(setRobot1Health(value)),
  setTurn : (player) => dispatch(setTurn(player)),
  setGameMode: (mode) => dispatch(setGameMode(mode))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
