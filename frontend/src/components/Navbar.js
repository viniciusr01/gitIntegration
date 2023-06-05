import logo from '../images/logo.png'
import './navbar.css'


import React, { useState, useEffect } from 'react';

function NavBar(){

    const [usuarios, setUsuarios] = useState([])
    
    useEffect(() => {
        
        fetch('http://localhost:5000/pull/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
              setUsuarios(data)
            })
            .catch((error)=> console.log(error))

    }, [])

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
                                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                                <span className="fs-5 d-none d-sm-inline"></span>
                                                
                                        </a>
                                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                                
                                                <br></br>
                                                <img className='logo' alt="Logo do Geolabor" src={logo}></img>
                                                
                                                <br></br>
                                                <li className="nav-item">
                                                        <a href="/" className="nav-link align-middle px-0 text-white ">
                                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                                        </a>
                                                </li>
                                                <li>
                                                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white ">
                                                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Usuários</span> </a>
                                                                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                                                
                                                                {usuarios.map( (user) =>(
                                                                        <li className="w-100">
                                                                            <a href={'/'+user} className="nav-link px-0"> <span className="d-none d-sm-inline text-white">{user}</span> </a>
                                                                        </li>
                                                                ))}
                                                                
                                                        </ul>
                                                </li>
                                                
                                               
                                        </ul>
                                
                                        {/*
                                        <div className="dropdown pb-4">
                                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                
                                                <span className="d-none d-sm-inline mx-1">User</span>
                                                </a>
                                                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                                                <li></li>
                                                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                                                        </ul>
                                        </div>
                                         */}
                                </div>
                        </div>
    )
}

export default NavBar