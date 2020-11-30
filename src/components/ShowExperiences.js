import React, { useState,useLayoutEffect } from 'react';
import {Table} from 'react-bootstrap'
import '../App.css'
import Firebase from '../services/firebaseConnect'
import { useHistory } from "react-router-dom";

export default  function ShowExperiences(props) {
    const [listComents, setListaComents] = useState([]);
    const [listPlaces, setListaPlaces] = useState([]);

    useLayoutEffect(() => {
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
                  console.log(lista);
              } else{
                setListaPlaces([])
              }
            })

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

    }, []) 

    return (

        <div style={{padding:'20px'}}>
        <p  className='p-3 mb-2 bg-warning text-dark' style={{ display: 'block', textAlign: "center", color: 'dark-blue'}}> Nas opções abaixo, considere 1 para muito baixo/péssimo e 5 para muito alto/ótimo</p>

        {listPlaces.map((itemPlace, key) => {

            return <Table responsive bordered key={key} style={{marginTop: '20px'}}>
                <thead responsive>
                    <tr>
                    <th colSpan="5" style={{textAlign:'center',width:'10px'}}><strong>{itemPlace.name}</strong>{' - Cidade de '+itemPlace.city}</th>                
                    </tr>
                </thead>
                <tbody >
                    <tr>
                    <td>Esperiência</td>
                    <td>Limpeza</td>
                    <td>Organização</td>
                    <td>Atendimento</td>
                    <td >Comentário</td>


                    </tr>
                    {listComents.map((itemEx, key) => {

                        if(itemEx.place == itemPlace.name){
                        return<tr key={key}>
                            <td>{'Anônima'}</td>
                            <td>{itemEx.clean}</td>
                            <td>{itemEx.org}</td>
                            <td>{itemEx.at}</td>
                            <td >{itemEx.about}</td>

                            </tr>
                        }else{
                            return null
                        }
                    })}
                 
                </tbody>
            </Table>
        })}
        </div>
    
    );
}


