import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./login.css";

import capa_geolabor from "../images/capa_geolabor.png";
import fundo_branco_geolabor from "../images/fundo_branco_geolabor.png";

function Login() {
  return (
    <div class="container text-center m-0 p-0">
      <div class="row">
        <div class="col">
          <img
            className="img-fluid"
            alt="Capa do Geolabor"
            src={capa_geolabor}
          ></img>
        </div>
        <div class="col">
          <div Style={{ background: `url(${fundo_branco_geolabor})` }}>
            <h5 Style="padding-top:8em; color: #152935; font-weight: bold">
              Git Integration
            </h5>

            <button
              type="button"
              class="btn btn-primary btn-dark "
              Style="margin:2em;"
            >
              <i class="bi bi-github"></i>&nbsp;LOGIN COM GITHUB
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
