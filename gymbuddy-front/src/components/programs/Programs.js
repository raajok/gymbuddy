import React from 'react';
import axios from "axios";
import ProgramCard from './ProgramCard';
import ProgramForm from './ProgramForm';
import './programs.css';

const Programs = () => {
  const [programs, setPrograms] = React.useState([]);

  React.useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = () => {
    axios.get('http://localhost:9000/api/programs')
      .then(res => {
        setPrograms(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="program-container">
      <div className="programcard-container">
        { programs.map(program => <ProgramCard key={program["_id"]} program={program} />) }
      </div>
      <div className="programform-container">
        <ProgramForm getPrograms={getPrograms} />
      </div>
    </div>
  );
};

export default Programs;