import React from 'react';
import logo from './images/trivial.png';
import './App.css';

import QuestionService from './QuestionService';

import { Button, Alert, Form } from 'reactstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questionData: {},
      chosen: undefined,
      correct: undefined,
      points: 0,
      answers: []
    }
    this.question();
  }

  question = () => {
    console.log('question() ha empezado');
    QuestionService.fetch('http://jservice.io/api/category?id=309', this.state)
      .then(newState => {
        this.setState(newState);
      })
    console.log('question() ha acabado')
  }

  select = (num) => {
    this.setState({ chosen: num });
  }

  ok = () => {
    if (this.state.chosen === this.state.correct) {
      const points = this.state.points + this.state.questionData.value;
      this.setState({ points, chosen: undefined, });
    } else {
      alert('Te has equivocado, la respuesta era: ' + this.state.correct)
    }
    this.question();
  }

  render() {
    const { chosen, answers, question } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section>
          <div className="App-points">{this.state.points}</div>
          <Form className="App-form">
            <Alert>{question}</Alert>
            <Button onClick={() => this.select(0)} className={chosen === 0 ? "btn-warning" : ""}>{answers[0]}</Button>
            <Button onClick={() => this.select(1)} className={chosen === 1 ? "btn-warning" : ""}>{answers[1]}</Button>
            <Button onClick={() => this.select(2)} className={chosen === 2 ? "btn-warning" : ""}>{answers[2]}</Button>
            <Button onClick={() => this.select(3)} className={chosen === 3 ? "btn-warning" : ""}>{answers[3]}</Button>
          </Form>
          <div>
            <Button className="btn-success btn-action" onClick={this.ok}>OK</Button>
            <Button className="btn-danger btn-action" onClick={this.question}>Otra pregunta</Button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
