import './home.css'
import NavBar from '../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";




function Home(){

    

    return (
        
        <div className="container-fluid">
                <div className="row flex-nowrap">
                                <NavBar />
                                <div className="col py-3">
                                        Content area...
                                </div>
                </div>
        </div>
    )
}

export default Home;