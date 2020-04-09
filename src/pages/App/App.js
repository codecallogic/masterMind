import React, { Component } from 'react';
import './App.css';    
import GamePage from '../../pages/GamePage/GamePage'
import { Route, Switch } from 'react-router-dom';
import SettingsPage from '../../pages/SettingsPage/SettingsPage'

const colors = {
  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
  Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968'],
  Difficult: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968', '#555E7B']
};

class App extends Component {
  constructor(){
    console.log('App: constructor')
    super()
    this.state = {...this.getNewState(), difficulty: 'Easy'}
  }

  getNewState(){
    return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
      elapsedTime: 0,
    }
  }

  handleNewGameClick = () => {
    this.setState(this.getNewState())
  }

  genCode(){
    let numColors = this.state && colors[this.state.difficulty].length;
    numColors = numColors || 4;
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * numColors));
  }

  getNewGuess() {
    return {
      // code: [3, 2, 1, 0],
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    }
  }

  handleDifficultyChange = (level) => {
    this.setState({difficulty: level}, () => this.handleNewGameClick())
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;

  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx})
  }

  handlePegClick = (idx) => {
    let currentGuessIdx   = this.state.guesses.length - 1
    let guessesCopy       = [...this.state.guesses]
    let guessCopy         = {...guessesCopy[currentGuessIdx]}
    let guessCode         = [...guessCopy.code]

    guessCode[idx]                = this.state.selColorIdx
    guessCopy.code                = guessCode
    guessesCopy[currentGuessIdx]  = guessCopy

    this.setState({
      guesses: guessesCopy
    })
  }

  handleScoreClick = () => {
    let currentGuessIdx = this.state.guesses.length - 1
    let guessCodeCopy   = [...this.state.guesses[currentGuessIdx].code]
    let secretCodeCopy  = [...this.state.code]
    let perfect = 0
    let almost = 0

    guessCodeCopy.forEach((code, idx) => {
      if(secretCodeCopy[idx] === code){
        perfect++
        guessCodeCopy[idx] = secretCodeCopy[idx] = null
      }
    })

    guessCodeCopy.forEach((code, idx) => {
      if(code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code)
      if(foundIdx > -1){
        almost++
        secretCodeCopy[foundIdx] = null
      }
    })

    let guessesCopy               = [...this.state.guesses]
    let guessCopy                 = {...guessesCopy[currentGuessIdx]}
    let guessScore                = guessCopy.score

    guessScore.perfect            = perfect
    guessScore.almost             = almost
    
    guessCopy.score               = guessScore
    guessesCopy[currentGuessIdx]  = guessCopy

    if(perfect !== 4) guessesCopy.push(this.getNewGuess())

    this.setState({
      guesses: guessesCopy
    })

  }

  handleTimerUpdate = () => {
    this.setState( (state) => ({
      elapsedTime: ++state.elapsedTime
    }))
  }

  componentDidMount() {
    console.log('App: componentDidMount')
  }

  componentDidUpdate() {
    console.log('App: componentDidUpdate')
  }

  render() {
    console.log('App: render')
    let winTries = this.getWinTries()
    return (
      <div className="App">
        <header className="App-header-footer text-center mb-5 mt-5">R E A C T &nbsp;&nbsp;&nbsp;&nbsp; M A S T E R M I N D</header>
        <Switch>
        <Route exact path="/" render={() => 
          <GamePage
            winTries={winTries}
            colors={colors[this.state.difficulty]}
            selColorIdx={this.state.selColorIdx}
            guesses={this.state.guesses}
            elapsedTime={this.state.elapsedTime}
            handleTimerUpdate={this.handleTimerUpdate}
            handleColorSelection={this.handleColorSelection}
            handleNewGameClick={this.handleNewGameClick}
            handlePegClick={this.handlePegClick}
            handleScoreClick={this.handleScoreClick}
          />
        } />
        <Route exact path='/settings' render={(props) => 
            <SettingsPage 
              {...props} 
              colorsLookup={colors}
              difficulty={this.state.difficulty}
              handleDifficultyChange={this.handleDifficultyChange}
            />
        } />
      </Switch> 
      </div>
    );
  }
}

export default App;


