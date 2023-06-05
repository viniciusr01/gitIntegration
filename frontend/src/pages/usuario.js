import './usuario.css'
import NavBar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useParams } from 'react-router-dom'


function Usuario(){


    const {username} = useParams()

    return (
        
        <div className="container-fluid">
                <div className="row flex-nowrap">
                                <NavBar />
                                <div className="col py-3">
                                        <h6> Oi {username} </h6>
                                </div>
                </div>
        </div>
    )
}

export default Usuario;