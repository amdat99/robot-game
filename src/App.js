import React,{useState,useEffect} from 'react'
import Robot1 from './components/robot1'
import Robot2 from './components/robot2'
import './App.css';

function App() {
const [player1Name, setPlayer1Name] = useState('')
const [player2Name, setPlayer2Name] = useState('')
const [playerNames, setPlayerNames ] = useState({player1:'',player2:''})

const setPlayer1 = () => {
  setPlayerNames({...playerNames,player1:player1Name})
}

const setPlayer2 = () => {
  setPlayerNames({...playerNames,player2:player2Name})
}

console.log(playerNames)
  return (
    <div className="App">

    <div>
      <input type="text" placeholder="enter name player1" onChange={ (e) => setPlayer1Name(e.target.value) }/>
      <button onClick={setPlayer1}>setPlayer1Name</button>
      
      <input type="text" placeholder="enter name player2" onChange={ (e) => setPlayer2Name(e.target.value) }/>
      <button onClick={setPlayer2}>setPlayer2Name</button>    
      </div>

      {playerNames.player1 ?
        <div>
        <Robot1 playerNames = {playerNames} />
        </div>
     :null }
      
     {playerNames.player2 ?
        <div>
          <Robot2 playerNames = {playerNames}  />
        </div>
     :null }
    </div>
  );
}

export default App;
