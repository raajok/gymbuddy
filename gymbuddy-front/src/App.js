import * as React from "react";
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Training from './components/training/Training';
import Programs from './components/programs/Programs';
import Program from './components/programs/Program';

const App = () => {
  // contains the id of the currently active program
  const [activeProgram, setActiveProgram] = React.useState("");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Training active={activeProgram} />} />
        <Route path='/programs' element={<Programs active={activeProgram} setActive={setActiveProgram} />} />
        <Route path='/programs/:programId' element={<Program />} />
      </Routes>
    </Router>
  );
};

export default App;
