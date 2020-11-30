 
import React, { useState,useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Row, Container, Col} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { useHistory } from "react-router-dom";

function Login(){
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [lembre, setLembre] = useState(false);

  
  useLayoutEffect(()=>{
    let emailStorage = localStorage.getItem('email');
    let passwordStorage = localStorage.getItem('password');
    if(emailStorage && passwordStorage){
      setEmail(emailStorage);
      setPassword(passwordStorage);
      setLembre(true);    
    }
    
        },[])
  const login = () => {

    if (lembre === false) {
        localStorage.removeItem("email")
        localStorage.removeItem("password")
    }

   

    Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((retorno) => {
            sessionStorage.setItem("uuid", retorno.user.uid)
            if (lembre === true) {
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)
            }
            setMsg("")
            setTimeout(() => {
                history.push("/wellcome");
            }, 100);


        })
        .catch((erro) => {
            console.log(erro)
            setMsg("Usuário ou senha inválidos!")
        })
}
const signUp = () =>{
  history.push("/signUp")


}

  return (
    <Container >

    <Row>
      <Col></Col>
      <Col>

        <Form className="form">
          <p  style={{ display: 'block', textAlign: "center", color: 'red'}}> {msg}</p> 
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} type="email" placeholder="Digite seu email" onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Mantenha-me logado" checked={lembre} onChange={(e) => setLembre(e.target.checked)}/>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" onClick={login} >Entrar</Button>
          </Col><Col>
            <Button style={{justifyContent: "right"}} variant="primary" onClick={signUp}>Cadastre-se </Button>
          </Col>
        </Row>
      </Form>
      </Col>
      <Col></Col>    
    </Row>
  </Container> 
  );
}


export default Login

