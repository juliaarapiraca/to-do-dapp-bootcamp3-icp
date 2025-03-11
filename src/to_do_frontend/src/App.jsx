import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import Tarefas from './tarefas';
import Login from './login';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/login/" element={<Login/>} />      
        <Route path="/tarefas/" element={<Tarefas/>} />        
      </Routes>
    </Router>

  );

}

export default App;  