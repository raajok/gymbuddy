import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './program.css';
import ProgramTable from './ProgramTable';

const Program = () => {
  const [program, setProgram] = React.useState({});

  const { programId } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`http://localhost:9000/api/programs/${programId}`)
      .then(res => {
        setProgram(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const deleteProgram = () => {
    axios.delete(`http://localhost:9000/api/programs/delete/${programId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });

    navigate(-1);
  };

  return (
    <div className="wrapper">
      <div className="title">
        <h1>{program.title}</h1>
      </div>
      <ProgramTable program={program} />
      {
        program.deletable &&
          <button onClick={deleteProgram}>Delete program</button>
      }
    </div>
  );
};

export default Program;