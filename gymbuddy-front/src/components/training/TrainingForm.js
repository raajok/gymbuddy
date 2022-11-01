import React from 'react';
import "./trainingform.css";

const TrainingForm = (props) => {
  const [inputValues, setInputValues] = React.useState([]);

  // initialize empty values for all sets for every movement
  React.useEffect(() => {
    // values will contain arrays. Each movement has its own array for sets.
    const values = [];
    props.day.movements?.forEach((movement) => {
      const reps = [];
      for (let i = 0; i < movement.amountOfSets; i++) {
        reps.push({ weight: '', amountOfReps: '' });
      }
      values.push(reps);
    });
    setInputValues(values);
  }, [props.day]);

  const handleChange = (movementIndex, setIndex, event) => {
    let values = [...inputValues];
    values[movementIndex][setIndex][event.target.name] = event.target.value;
    setInputValues(values);
  };

  return (
    <div className="training-form" >
      <h1>Log your reps:</h1>
      <form>
        <ul className="movements">
          {props.day.movements?.map((movement, index) => {
            return(
              <li key={index}>
                <label>
                  {movement.name}
                    {<div className='inputs'>
                        {inputValues[index] && inputValues[index].map((set, i) => {
                          return(
                            <div key={i} className='set-inputs'>
                              {`Set ${i+1}`}
                              <input 
                                className='input' 
                                placeholder={`Reps`}
                                name='amountOfReps'
                                value={set.amountOfReps}
                                onChange={event => handleChange(index, i, event)}
                              />
                              <input 
                                className='input'
                                placeholder='Weight (kg)'
                                name='weight'
                                value={set.weight}
                                onChange={event => handleChange(index, i, event)}
                              />
                            </div>
                          )
                        })}
                    </div>}
                </label>
              </li>
            )
          })}
        </ul>
        <button className='submit-button' onClick={event => props.submit(event, inputValues)}>Submit</button>
      </form>
    </div>
  );
};

export default TrainingForm;