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

    function getData(pr){
        return [
            {'Additions': pr.countOfAdditions},
            {'ChangedFiles': pr.countOfChangedFiles},
            {'Comments': pr.countOfComments},
            {'Commits': pr.countOfCommits},
            {'Deletions': pr.countOfDeletions},
            {'ReviewComments': pr.countOfReviewComments},

        ]
    }

    return (
        
        <div className="container-fluid">
                <div className="row flex-nowrap">
                                <NavBar />
                                <div className="col py-0 px-0">
                                    
                                    <div className="d-flex flex-column bd-highlight mb-3 bg-dark">
                                        <div className="p-2 text-light">{username}</div>
                                    </div>
                               

                                    <div className="col py-3 px-3">
                                        
                                        <h6>A soma de Pull Request abertos do {username} é {sumPR} </h6>
                                        &ensp;
                                        
                                        <table className="table">

                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">Titulo</th>
                                                    <th scope="col"># Commit</th>
                                                    <th scope="col"># Arquivos alterados</th>
                                                    <th scope="col"># Arquivos adicionados</th>
                                                    <th scope="col"># Arquivos deletados</th>
                                                </tr>
                                            </thead>
                                        
                                            {prs.map( (pr) => (
                                            
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{pr.title}</th>
                                                    <th scope="row">{pr.countOfCommits}</th>
                                                    <th scope="row">{pr.countOfChangedFiles}</th>
                                                    <th scope="row">{pr.countOfAdditions}</th>
                                                    <th scope="row">{pr.countOfDeletions}</th>
                                                </tr>
                                                
                                            </tbody>                                                                                            
                                            ))}

                                        </table>
                                    </div>

                                </div>
                </div>
        </div>
    )
}

export default Usuario;