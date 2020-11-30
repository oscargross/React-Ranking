import React from 'react';
import {Card, Container, Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import image from '../assets/logo.jpg'

export default  function Wellcome(props) {   
    let history = useHistory();
    setTimeout(() => {
        history.push("/menu")

    }, 4000);
    return (    
        <Container style={{margin: '200px auto'}}>
        <Card className="bg-dark text-white">
        <Card.Img src={image} alt="Logo do projeto" />        
        </Card>
        <h3 style={{textAlign:'center', fontWeight:'bold'}}>Bem Vindo ao Projeto Ranking-Places</h3>
        <p style={{textAlign:'center'}}>Aguarde...</p>

      </Container>    
    );
}


