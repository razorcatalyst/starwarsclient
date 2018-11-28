//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class CharacterCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { name, height, mass, gender, image} = this.props.character;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle><b>Height: </b>{height}</CardSubtitle>
            <CardText><b>Mass: </b>{mass}</CardText>
            <CardText><b>Gender: </b>{gender}</CardText>
            <Button
              color="primary"
              onClick={() => this.props.removeCharacter(name)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CharacterCard;
