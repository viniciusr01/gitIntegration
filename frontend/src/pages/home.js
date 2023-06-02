import './home.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../images/logo.png'


function Home(){



    return (
        
        <div class="container-fluid">
                <div class="row flex-nowrap">
                        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
                                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                                <span class="fs-5 d-none d-sm-inline"></span>
                                                
                                        </a>
                                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                                
                                                <br></br>
                                                <img class='logo' src={logo}></img>
                                                
                                                <br></br>
                                                <li class="nav-item">
                                                        <a href="#" class="nav-link align-middle px-0 text-white ">
                                                                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                                                        </a>
                                                </li>
                                                <li>
                                                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white ">
                                                                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Usuários</span> </a>
                                                                <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                                                <li class="w-100">
                                                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Item 1</span> </a>
                                                                </li>
                                                                <li>
                                                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Item 2</span></a>
                                                                </li>
                                                        </ul>
                                                </li>
                                                
                                               
                                        </ul>
                                
                                        {/*
                                        <div class="dropdown pb-4">
                                                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                
                                                <span class="d-none d-sm-inline mx-1">User</span>
                                                </a>
                                                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                                                                <li><a class="dropdown-item" href="#">New project...</a></li>
                                                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                                                <li></li>
                                                                <li><a class="dropdown-item" href="#">Sign out</a></li>
                                                        </ul>
                                        </div>
                                         */}
                                </div>
                        </div>
                
                                <div class="col py-3">
                                        Content area...
                                </div>
                </div>
        </div>
    )
}

export default Home;