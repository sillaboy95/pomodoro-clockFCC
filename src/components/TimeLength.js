import React from 'react';

class TimeLength extends React.Component{
    constructor(props){
      super(props);
         
    }
    
    
   
    
     render() {
      return(
        <div >
          <h6 id={this.props.id} >{this.props.text}</h6>
          <button id={this.props.plusId} onClick={this.props.onPlusClick}>+1</button>
          <span id={this.props.defaultId}>{this.props.default}</span>
          <button id={this.props.minusId} onClick={this.props.onMinusClick}>-1</button>
        </div>
    
    
      )
   }
  }

  export default TimeLength