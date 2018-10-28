import React, { Component } from 'react';
import Map from './components/Map';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Alert } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md='12' sm='12' >
              <h1>Cities Quiz</h1>
            </Col>
          </Row>
          <Row>
            <Col md='12' sm='12' >
              <Map/>
            </Col>
          </Row>
          </Container>
      </div>
    );
  }
}

export default App;
