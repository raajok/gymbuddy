import * as React from "react";
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Training from './components/training/Training';
import Programs from './components/programs/Programs';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Training />} />
        <Route path='/programs' element={<Programs />} />
      </Routes>
    </Router>
  );
};

export default App;
