import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Usuario from './pages/usuario';
import Login from './pages/login'


function App() {
  return (

    <Router>
      <div>
      

        <Routes>
          <Route path="/" index element={<Login/>}></Route>
          <Route path="/home" index element={<Home/>}></Route>
          <Route path="/:username" index element={<Usuario/>}></Route>
        
        </Routes>

      </div>

    </Router>
    
  );
}

export default App;