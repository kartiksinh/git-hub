import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props)=>{
  return(
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} alt="profilepic"/>
      <div style={{display: 'inline-block',marginLeft:10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};       


const CardList = (props)=>{
  return(
      <div>
        {props.cards.map((card, index)=><Card key={index} {...card} />)}
      </div>
    );
}  
class App extends Component {
  state = {
    cards : []
  };

  addNewCard= (cardInfo)=>{
    this.setState(prevState =>({
      cards: prevState.cards.concat(cardInfo)
    }));
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GITHUB APIs</h1>
        </header>
        
          <Form onSubmit={this.addNewCard} />
          <CardList cards={this.state.cards}/>
        
      </div>
    );
  }
}
export default App;

class Form extends React.Component{
  state = { userName : ''}
  handleSubmit = (event)=>{
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(res=>{
      this.props.onSubmit(res.data);
    });
  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event)=> this.setState({userName: event.target.value})}
          placeholder="Github U/sername" required></input>
        <button type="submit">Add card</button>
      </form>
    );
  }
}