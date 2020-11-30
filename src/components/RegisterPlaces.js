import React, { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";

export default  function RegisterPlaces(props) {
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [typePlace, setTypePlace] = useState("");
    const [msg, setMsg] = useState("");

    const limpar = () => {
        setCity("")
        setName("")
        setMsg("")
    }

    const placeRegister=()=>{
        name && city && typePlace
        ? placeRegisterFirebase()
        : setMsg('Preencha todos os campos');
    }
    const placeRegisterFirebase =()=>{

        let objeto = {
            city: city,
            name: name,
            typePlace: typePlace,            
        }
        let code = uuidv4()
    
        Firebase
        .database()
        .ref(`places/${code}`)
        .set(objeto)
        .then(() => {
            limpar()
            setMsg("Local gravado com sucesso!!")
        })
        .catch((erro) => {
            console.log(erro)
        })
        setTimeout(() => {
            props.setScreen(0)

        }, 2000);

    }

    return (
       <>
 
        <Form className= 'container' style={{ marginTop: '40px'}}>
        <p  style={{ display: 'block', textAlign: "center", color: 'red'}}>    {msg}
    </p> 
    <Form.Group controlId="formBasicPassword">
        <Form.Label>Nome do local</Form.Label>
        <Form.Control value={name} type="text" placeholder="Nome do local" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Tipo de estabelecimento</Form.Label>
    <Form.Control as="select" value={typePlace}  onChange={(e)=>setTypePlace(e.target.value)}>
      <option>Restaurante</option>
      <option>Lanchonete</option>
      <option>Boate</option>
      <option>Centro de eventos</option>
      <option>Loja</option>
    </Form.Control>
  </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Cidade</Form.Label>
        <Form.Control value={city} type="text" placeholder="Qual cidade está o local" onChange={(e)=>setCity(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Button variant="primary" onClick={placeRegister}>Enviar </Button>    
     </Form>
    </>
    );
}


