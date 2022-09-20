import React from 'react';

const ProgramTable = ({ program }) => {
  return (
    <div className="content">
        <p>{program.description}</p>
        {program.days?.map((day, i) => {
          return (
            <div className="table" key={day["_id"]}>
              <h2>Day {i+1}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Movement</th>
                    <th>Sets</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {day?.movements.map(movement => {
                    return(
                      <tr key={movement["_id"]}>
                        <td>{movement.name}</td>
                        <td>{movement.amountOfSets}</td>
                        <td>{movement.amountOfReps}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
  );
};

export default ProgramTable;