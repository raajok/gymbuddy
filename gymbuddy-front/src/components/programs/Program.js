import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './program.css';
import ProgramTable from './ProgramTable';

const Program = () => {
  const [program, setProgram] = React.useState({});

  const { programId } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:9000/api/programs/${programId}`)
      .then(res => {
        setProgram(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="title">
        <h1>{program.title}</h1>
      </div>
      <ProgramTable program={program} />
    </div>
  );
};

export default Program;