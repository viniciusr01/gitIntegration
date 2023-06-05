import './usuario.css'
import NavBar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';



function Usuario(){

    const {username} = useParams()

    const [prs, setPrs] = useState([])
    const [sumPR, setSumPR] = useState([])
    
    useEffect(() => {
        
        fetch(`http://localhost:5000/pull/${username}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setPrs(data.pr)
                setSumPR(data.sum)
                console.log(data)
            })
            .catch((error)=> console.log(error))

    }, [])



    

    return (
        
        <div className="container-fluid">
                <div className="row flex-nowrap">
                                <NavBar />
                                <div className="col py-0 px-0">
                                    
                                    <div class="d-flex flex-column bd-highlight mb-3 bg-dark">
                                        <div class="p-2 text-light">{username}</div>
                                    </div>
                               

                                    <div className="col py-3 px-3">
                                        
                                        <h6>A soma de Pull Request abertos do {username} é {sumPR} </h6>
                                        &ensp;
                                        
                                        {prs.map( (pr) => (

                                                <div class="row">

                                                    <div class="col-sm-6">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                {pr.title}
                                                            </div>
                                                            <div class="card-body">
                                                                <p class="card-text">Quantidade de commits: {pr.countOfCommits}</p>
                                                                <p class="card-text">Quantidade de arquivos modificados: {pr.countOfChangedFiles}</p>
                                                            </div>
                                                        </div>
                                                        &ensp;
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                {pr.title}
                                                            </div>
                                                            <div class="card-body">
                                                                <p class="card-text">Quantidade de commits: {pr.countOfCommits}</p>
                                                                <p class="card-text">Quantidade de arquivos modificados: {pr.countOfChangedFiles}</p>
                                                            </div>
                                                        </div>
                                                        &ensp;
                                                    </div>

                                              
                                                </div>
                                                 
                                               
                                        ))}
                                    </div>

                                </div>
                </div>
        </div>
    )
}

export default Usuario;