import React from 'react';
import { TimeLength } from './components'

const audio = document.getElementById('beep');
console.log(audio)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop=undefined;
    this.state ={
      sessionLength: 25,
      breakLength: 5,
      sessionClock: 1500,
      breakClock: 300,
      isPlaying: false,
      currentSession: "session"
    };
    this.handlePlusClick=this.handlePlusClick.bind(this);
this.handleMinusClick=this.handleMinusClick.bind(this);
this.handleClock=this.handleClock.bind(this);
this.handlePlayClick=this.handlePlayClick.bind(this);
    this.handleLoop=this.handleLoop.bind(this)
    this.handleReset=this.handleReset.bind(this)
    this.handleBreakPlus=this.handleBreakPlus.bind(this)
    this.handleBreakMinus=this.handleBreakMinus.bind(this)
}
  handleBreakPlus(){
    this.setState(function(state){
      if(state.breakLength<60 &&state.isPlaying===false) { 
      return {
       breakLength: state.breakLength+1,
       breakClock: state.breakLength*60+60
      }
    }
  })
  }
  handleBreakMinus(){
     this.setState(function(state){
      if(state.breakLength>1 && state.isPlaying===false){
        return{
          breakLength: state.breakLength-1,
          breakClock: state.breakLength*60-60
        }
      }
    })
  }
  handleReset(){
   clearInterval(this.loop)
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      sessionClock: 1500,
      breakClock:300,
      isPlaying: false,
      currentSession: "session"
    })
    audio.pause()
    audio.currentTime = 0
  }
  handleLoop(){
    if(this.state.sessionClock>0 && this.state.currentSession==="session") { 
    this.setState(function(state) {
   return{ 
     sessionClock: state.sessionClock-1,
     isPlaying: true,
   }
  }) 
    } 
   else if (this.state.breakClock>0 && this.state.currentSession==="break"){
      this.setState(function(state) {
   return{ 
     breakClock: state.breakClock-1,
     isPlaying: true,
   }
  }) 
    }
      
    else if(this.state.sessionClock===0  && this.state.currentSession==="session"){
      
      this.setState({
        currentSession: "break",
        breakClock: this.state.breakLength*60
      })
    audio.play()
    }
      
    
  else  if (this.state.breakClock===0 && this.state.currentSession==="break"){
      
        this.setState({
          currentSession: "session",
          sessionClock: this.state.sessionLength*60
        })
    audio.play()
      }}
  
  handlePlayClick(){
    if(this.state.isPlaying===false) { 
      
    this.loop =  setInterval(this.handleLoop, 1000);
    }
    else if(this.state.isPlaying===true){
      clearInterval(this.loop)
      
      this.setState({
        isPlaying: false,
      })
    }
  } 
  handleClock(clock){
     
    var minutes=Math.floor(clock/60)
    var seconds=(clock%60)
    if (minutes<10 && seconds<10) {
      
   
    return "0"+ minutes + ":0" + seconds
    }
    else if (minutes<10) {
      return "0" +minutes +":" +seconds
    }
    else if (seconds<10) {
      return  minutes +":0" + seconds
    }
    else {
      return minutes+":"+seconds
    }
  }
  handlePlusClick(){
    this.setState(function(state){
      if(state.sessionLength<60 &&state.isPlaying===false) { 
      return {
       sessionLength: state.sessionLength+1,
       sessionClock: state.sessionLength*60+60
      }
    }
  })
 }
  handleMinusClick(){
    this.setState(function(state){
      if(state.sessionLength>1 && state.isPlaying===false){
        return{
          sessionLength: state.sessionLength-1,
          sessionClock: state.sessionLength*60-60
        }
      }
    })
  }
  
  render() {
    return (
      <div className="container"> 
        <h1>FCC Pomodoro Clock</h1>
        <div>
         <TimeLength id="session-label" text="Session Length" default={this.state.sessionLength} onPlusClick={this.handlePlusClick} onMinusClick={this.handleMinusClick} minusId="session-decrement" plusId="session-increment" defaultId="session-length"/>
         <TimeLength id="break-label" text="Break Length" default={this.state.breakLength} onPlusClick={this.handleBreakPlus} onMinusClick={this.handleBreakMinus} minusId="break-decrement" plusId="break-increment" defaultId="break-length" />
        </div>
        <div className="time-container">
          <p id="timer-label">{this.state.currentSession}</p>
          <p id="time-left">{this.handleClock(this.state.currentSession==="session" ? this.state.sessionClock : this.state.breakClock)}</p>
        </div>
        <div>
          <button className="other-buttons" id="start_stop" onClick={this.handlePlayClick}>play/pause</button>
          <button className="other-buttons" id="reset" onClick={this.handleReset}>reset</button>
        </div>
      
      </div>
     );
   }
}

export default App;
