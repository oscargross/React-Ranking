import React, { useState,useLayoutEffect }from 'react';
import {Form, Button, Navbar, Nav, Card, Image} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Firebase from '../services/firebaseConnect'
import RegisterExperience from '../components/RegisterExperience';
import RegisterPlaces from '../components/RegisterPlaces';
import ShowExperiences from '../components/ShowExperiences';
import MyExperiences from '../components/MyExperiences';
import image from '../assets/logo.jpg'

export default function NavPagesControl() {
  let history = useHistory();
  const [screen, setScreen] = useState(0)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            }).catch(() => {
                history.push("/");
            })
    }
return(
    <>
    
    <Navbar bg="light" expand="lg">
  <Navbar.Brand onClick={() => setScreen(0)}><Image src={image} style={{height:60}}/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link onClick={() => setScreen(0)}>Experiências relatadas</Nav.Link>
    <Nav.Link onClick={() => setScreen(1)}>Novos lugares</Nav.Link>
    <Nav.Link onClick={() => setScreen(2)}>Anotar experiência</Nav.Link>
    <Nav.Link onClick={() => setScreen(3)}>Minhas experiências</Nav.Link>
          
    </Nav>
    <Form inline>
      <Button variant="outline-danger" onClick={logoff}>Sair</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
  
  <div className='container' >
  {screen === 0 &&
      <ShowExperiences setScreen={setScreen} />
  }
  {screen === 1 &&
      <RegisterPlaces setScreen={setScreen} />
  }
  {screen === 2 &&
      <RegisterExperience setScreen={setScreen} />
  }
  {screen === 3 &&
      <MyExperiences setScreen={setScreen} />
  }
  </div>

    <footer style={{paddingTop:'270px'}}>

    <Card >
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Informações do desenvolvedor</Card.Title>
        <Card.Text style={{textAlign:'center'}}>
          Oscar Gross Jr
        </Card.Text>
        <Card.Text style={{textAlign:'center'}}>
          1118783@imed.edu.br
        </Card.Text>
        <div style={{textAlign:'center'}}><a  href='https://github.com/oscargross'><Button variant="primary">Acessar GitHub</Button></a></div>
      </Card.Body>
    </Card>
    </footer>
</>
)
}



