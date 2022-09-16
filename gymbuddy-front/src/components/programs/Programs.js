import React from 'react';
import axios from "axios";
import ProgramCard from './ProgramCard';
import './programs.css';

const Programs = () => {
  const [programs, setPrograms] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:9000/api/programs')
      .then(res => {
        setPrograms(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="program-container">
      { programs.map(program => <ProgramCard key={program["_id"]} program={program} />) }
    </div>
  );
};

export default Programs;