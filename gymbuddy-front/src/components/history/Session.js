import React from 'react';
import "./session.css";
import axios from "axios";

const Session = ( props ) => {

  const handleRemove = () => {
    axios.delete(`http://localhost:9000/api/delete/${props.training["_id"]}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });

    props.handleTrainings();
  };

  return (
    <div className='session'>
      <div className='session-header'>
        <h2>{props.training.program + " - " + props.training.day}</h2>
        <p>{props.training.date}</p>
      </div>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Movement</th>
              <th>Reps and weight</th>
            </tr>
          </thead>
          <tbody>
            {props.training.movements.map(movement => {
              let repsString = "";

              movement.sets.forEach((set, i) => {
                if (i < movement.sets.length - 1) {
                  repsString += set.amountOfReps + " (" + set.weight + " kg), ";
                } else {
                  repsString += set.amountOfReps + " (" + set.weight + " kg)";
                }
              });

              return(
                <tr key={movement["_id"]}>
                  <td>{movement.name}</td>
                  <td>{repsString}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='button-wrapper'>
        <button className='remove-button' onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Session;