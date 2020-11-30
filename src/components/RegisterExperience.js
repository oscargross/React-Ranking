import React, { useState,useLayoutEffect } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";


export default  function RegisterExperience(props) { 
    const [listaPlaces, setListaPlaces] = useState([])
    const [place, setPlace] = useState("")
    const [msg, setMsg] = useState("");
    const [about, setAbout] = useState("");
    const [org, setOrg] = useState(null);
    const [at, setAt] = useState(null);
    const [clean, setClean] = useState(null);

    const limpar = () => {
      setListaPlaces([])
      setPlace("")
      setMsg("")
      setAbout("")
      setOrg(null)
      setAt(null)
      setClean(null)
  }

  const registerExperience=()=>{
console.log(place);
    place==='Selecione um estabelecimento' 
    
    ? setMsg('Selecione um estabelecimento')    
    :  place && about && org && at && clean
      ? registerExperienceFirebase()
      : setMsg('Preencha todos os campos');
   
  }
  const registerExperienceFirebase =()=>{
    let uid = sessionStorage.getItem('uuid');
    console.log(uid)
    let objeto = {
          place: place,
          about: about,
          org: org, 
          at:at,
          clean: clean,
          idUser: uid,          
      }
      let code = uuidv4()
  
      Firebase
      .database()
      .ref(`experiences/${code}`)
      .set(objeto)
      .then(() => {
          limpar()
          setMsg("Experiência gravada com sucesso!!")
      })
      .catch((erro) => {
          console.log(erro)
      })
      setTimeout(() => {
          props.setScreen(0)
      }, 2000);

  }

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/places`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                  let dados = snapshot.val()
                  const keys = Object.keys(dados)
                  const lista = keys.map((key) => {
                      return { ...dados[key], id: key }
                  })                  
                  setListaPlaces(lista)
              } else{
                setListaPlaces([])
              }
            })

    }, []) 

    return (     
 
      <Form className= 'container' style={{ marginTop: '40px'}}>
        <p  style={{ display: 'block', textAlign: "center", color: 'red'}}>    {msg} </p> 

        <Form.Group controlId="ControlSelect">
          <Form.Label>Estabelecimento</Form.Label>
            <Form.Control as="select" value={place}  onChange={(e)=>setPlace(e.target.value)}>
            <option>Selecione um estabelecimento</option>
            {listaPlaces.map((item, key) => {
              return <option  key={key} >{item.name}</option>
            })}            
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descreva sua experiência</Form.Label>
        <Form.Control as="textarea" rows={3} value={about}  onChange={(e)=>setAbout(e.target.value)} />
        </Form.Group>      
          <p  className='p-3 mb-2 bg-warning text-dark' style={{ display: 'block', textAlign: "center", color: 'dark-blue'}}>   Nas opções abaixo, considere 1 para muito baixo/péssimo e 5 para muito alto/ótimo</p>
        <Form.Row className="align-items-center">
      <Form.Group as={Col}>
        <fieldset >
          <Form.Label as="legend" column sm={20} style={{marginLeft:10}}>
              Limpeza do local
          </Form.Label>
          <Row sm={10} style={{marginLeft:10}}>
              <Form.Check style={{marginRight:20}}
              type="radio"
              label="1"
              name="clean"
              id="clean1"
              value='1'
              onChange={(e)=>setClean(e.target.value)}
              
              />
              <Form.Check style={{marginRight:20}}
              type="radio"
              label="2"
              name="clean"
              id="clean2"
              value='2'
              onChange={(e)=>setClean(e.target.value)}
              />
              <Form.Check style={{marginRight:20}}
              type="radio"
              label="3"
              name="clean"
              id="clean3"
              value='3'
              onChange={(e)=>setClean(e.target.value)}
              />
              <Form.Check style={{marginRight:20}}
              type="radio"
              label="4"
              name="clean"
              id="clean4"
              value='4'
              onChange={(e)=>setClean(e.target.value)}
              />
              <Form.Check style={{marginRight:20}}
              type="radio"
              label="5"
              name="clean"
              id="clean5"
              value='5'
              onChange={(e)=>setClean(e.target.value)}
              />
          </Row>
        </fieldset>
      </Form.Group>
      <Form.Group as={Col}>

        <fieldset >
          <Form.Label as="legend" column sm={20} style={{marginLeft:10}}>
              Organização
          </Form.Label>
          <Row sm={10} style={{marginLeft:10}}>
            <Form.Check style={{marginRight:20}}
            type="radio"
            label="1"
            name="org"
            id="org1"
            value='1'
            onChange={(e)=>setOrg(e.target.value)}

            />
            <Form.Check style={{marginRight:20}}
            type="radio"
            label="2"
            name="org"
            id="org2"
            value='2'
            onChange={(e)=>setOrg(e.target.value)}
            />
            <Form.Check style={{marginRight:20}}
            type="radio"
            label="3"
            name="org"
            id="org3"
            value='3'
            onChange={(e)=>setOrg(e.target.value)}

            />
            <Form.Check style={{marginRight:20}}
            type="radio"
            label="4"
            name="org"
            id="org4"
            value='4'
            onChange={(e)=>setOrg(e.target.value)}

            />
            <Form.Check style={{marginRight:20}}
            type="radio"
            label="5"
            name="org"
            id="org5"
            value='5'
            onChange={(e)=>setOrg(e.target.value)}

            />
          </Row>
        </fieldset>
      </Form.Group>
    <Form.Group as={Col}>

      <fieldset >
        <Form.Label as="legend" column sm={20} style={{marginLeft:10}}>
            Atendimento
        </Form.Label>
        <Row sm={10} style={{marginLeft:10}}>
          <Form.Check style={{marginRight:20}}
          type="radio"
          label="1"
          name="at"
          id="at1"
          value='1'
          onChange={(e)=>setAt(e.target.value)}
          />
          <Form.Check style={{marginRight:20}}
          type="radio"
          label="2"
          name="at"
          id="at2"
          value='2'
          onChange={(e)=>setAt(e.target.value)}
          />
          <Form.Check style={{marginRight:20}}
          type="radio"
          label="3"
          name="at"
          id="at3"
          value='3'
          onChange={(e)=>setAt(e.target.value)}
          />
          <Form.Check style={{marginRight:20}}
          type="radio"
          label="4"
          name="at"
          id="at4"
          value='4'
          onChange={(e)=>setAt(e.target.value)}
          />
          <Form.Check style={{marginRight:20}}
          type="radio"
          label="5"
          name="at"
          id="at5"
          value='5'
          onChange={(e)=>setAt(e.target.value)}
          />
      </Row>
    </fieldset>
  </Form.Group>
  </Form.Row>
    <Button variant="primary" onClick={registerExperience} >
      Enviar
    </Button>
  </Form>    
    
  );
}

