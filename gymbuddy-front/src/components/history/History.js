import React from 'react';
import axios from "axios";
import Session from "./Session";
import "./history.css";

const History = () => {
  const [trainings, setTrainings] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:9000/api/`)
      .then(res => {
        setTrainings(res.data.reverse());
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className='history'>
      {trainings.map(training => {
        return (
          <Session key={training["_id"]} training={training} />
        )
      })}
    </div>
  );
};

export default History;