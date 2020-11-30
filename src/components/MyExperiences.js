import React, { useState,useLayoutEffect } from 'react';
import {Table, Button} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { TrashFill } from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";


export default  function MyExperiences(props) {
    let history = useHistory();
    const [listComents, setListaComents] = useState([]);
    const [listPlaces, setListaPlaces] = useState([]);
    const [msg, setMsg] = useState('Nas opções abaixo, considere 1 para muito baixo/péssimo e 5 para muito alto/ótimo');

    useLayoutEffect(() => {
        
        Firebase
            .database()
            .ref(`/experiences`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                  let dados = snapshot.val()
                  const keys = Object.keys(dados)
                  const lista = keys.map((key) => {
                      return { ...dados[key], id: key }
                  })                  
                  setListaComents(lista)
              } else{
                setListaComents([])

              }
            })
            Firebase
            .database()
            .ref(`/places`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                  let dados = snapshot.val()
                  let keys = Object.keys(dados)
                  let lista = keys.map((key) => {
                      return { ...dados[key], id: key }
                  })                  
                  setListaPlaces(lista)
              } else{
                setListaPlaces([])
              }
            })

    }, []) 
    const excluir = (item) => {
        Firebase
            .database()
            .ref(`/experiences/${item.id}`)
            .remove()

            setMsg('Registro excluído com sucesso! ')

            setTimeout(() => {
                setMsg('Nas opções abaixo, considere 1 para muito baixo/péssimo e 5 para muito alto/ótimo ')

            }, 2000);
    }
    
    return (

        <div style={{padding:'20px'}}>
        <p  className='p-3 mb-2 bg-warning text-dark' style={{ display: 'block', textAlign: "center", color: 'dark-blue'}}>{msg}</p>

        {listPlaces.map((itemPlace, key) => {            

            return <div key={key} style={{marginTop: '20px'}}>          
            
            <Table bordered  >
                <thead>
                    <tr>
                    <th colSpan="6" ><strong style={{textAlign:'center',width:'10px'}}>{itemPlace.name}</strong>{' - Cidade de '+itemPlace.city}</th> 
                    </tr>
                </thead>
                <tbody >
                    <tr>
                    <td>Esperiência</td>
                    <td>Limpeza</td>
                    <td>Organização</td>
                    <td>Atendimento</td>
                    <td>Comentário</td>
                    <td>Excluir</td>
                    </tr>
                     {listComents.map((itemEx, key) => {

                        if(sessionStorage.getItem('uuid') === itemEx.idUser){
                            if(itemEx.place === itemPlace.name){

                                return <tr>
                                <td>{'Anônima'}</td>
                                <td>{itemEx.clean}</td>
                                <td>{itemEx.org}</td>
                                <td>{itemEx.at}</td>
                                <td >{itemEx.about}</td>
                                <td ><Button variant="danger" onClick={ () => excluir(itemEx)}><TrashFill/></Button></td>
                                </tr>
                                
                            }else{
                                return null
                            }
                        }else{
                            return null 
                        }                        
                    })} 
                 
                </tbody>
            </Table>
            </div>
        })}        
        </div>
    
    );
}


