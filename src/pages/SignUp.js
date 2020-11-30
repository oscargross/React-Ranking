 
import React, { useState,useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Row, Container, Col} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { useHistory } from "react-router-dom";

function SignUp(){
    let history = useHistory();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [terms,setTerms] = useState(false)

const signUp=()=>{
    name && city && email && password
    ?  !terms ? setMsg('Aceite os termos para continuar')
        : createUser()
    : setMsg('Preencha todos os campos');
}

function createUser() {
    Firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});  
history.push("/")  
}

const login = () =>{
    history.push("/")
  
  
  }
return (
    <Container >
    <Row>
      <Col></Col>
      <Col> 
    <Form className='form'>
    <p  style={{ display: 'block', textAlign: "center", color: 'red'}}>    {msg}
</p> 
<Form.Group controlId="formBasicEmail">
    <Form.Label>Nome</Form.Label>
    <Form.Control value={name} type="email" placeholder="Digite seu nome" onChange={(e)=>setName(e.target.value)}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

<Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control value={email} type="email" placeholder="Digite seu email" onChange={(e)=>setEmail(e.target.value)}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Cidade</Form.Label>
    <Form.Control value={city} type="email" placeholder="Digite sua cidade" onChange={(e)=>setCity(e.target.value)}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Senha</Form.Label>
    <Form.Control value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Aceito os termos" checked={terms} onChange={(e) => setTerms(e.target.checked)}/>
  </Form.Group>
  <Row>
  <Col>
  <Button variant="primary" onClick={signUp}  >

    Cadastrar
  </Button>
  </Col><Col>
  <Button style={{justifyContent: "right"}} variant="primary" onClick={login}> 
    Voltar
  </Button>
  </Col>
  </Row>

</Form>
</Col>
    <Col></Col>
    
  </Row>
</Container>
  );
}
export default SignUp