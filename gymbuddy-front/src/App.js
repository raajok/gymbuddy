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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Training />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/programs/:programId' element={<Program />} />
      </Routes>
    </Router>
  );
};

export default App;
