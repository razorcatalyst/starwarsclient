import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      name: '',
      characters: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://starwarsserver-assignment.herokuapp.com/getallcharacters')
      .then(result => {
        this.setState({ characters: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://starwarsserver-assignment.herokuapp.com/getcharacter?search=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCharacter(name) {
    this.setState({
      characters: this.state.characters.filter(character => {
        if (character.name !== name) return character;
      })
    });
    const query = `https://starwarsserver-assignment.herokuapp.com/deletecharacter?search=${name}`;
    axios
      .get(query)
      .then(result => {
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let characterCards = this.state.characters.map(character => {
      return (
        <Col sm="4" key={character.name}>
          <CharacterCard removeCharacter={this.removeCharacter.bind(this)} character={character} />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Jumbotron id="jumboheader">
            <h1 className="display-4">Star Wars Character Search</h1>
            <p className="lead">Search for any characters in the Star Wars saga!</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Enter a character name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter a character name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Search</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{characterCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
