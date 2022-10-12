import React from 'react';
import './programform.css';
import axios from "axios";

const ProgramForm = (props) => {
  const [values, setValues] = React.useState({
    title: '',
    description: '',
  });
  
  const [days, setDays] = React.useState([
    {
      movements: [{
          name: '',
          amountOfSets: '',
          amountOfReps: '',
        },
      ]
    },
  ]);

  const handleTitle = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      title: event.target.value,
    }));
  };

  const handleDescription = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

  const handleMovement = (dayIndex, movementIndex, event) => {
    let data = [...days];
    data[dayIndex].movements[movementIndex][event.target.name] = event.target.value;
    setDays(data);
  };

  const addMovement = (event, dayIndex) => {
    event.preventDefault();

    let newMovement = { name: '', amountOfSets: '', amountOfReps: '' };
    let data = [...days];
    data[dayIndex].movements.push(newMovement);
    setDays(data);
  };

  const addDay = (event) => {
    event.preventDefault();

    let newDay = { movements: [{ name: '', amountOfSets: '', amountOfReps: '' }] };
    let data = [...days, newDay];
    setDays(data);
  }

  const removeMovement = (event, dayIndex, movementIndex) => {
    event.preventDefault();
    let data = [...days];
    data[dayIndex].movements.splice(movementIndex, 1);
    setDays(data);
  }

  const removeDay = (event, dayIndex) => {
    event.preventDefault();
    let data = [...days];
    data.splice(dayIndex, 1);
    setDays(data);
  }

  const submit = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      title: values.title,
      description: values.description,
      days: days,
      deletable: true,
    };

    axios.post('http://localhost:9000/api/programs', dataToSubmit)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });

    setValues({
      title: '',
      description: '',
    });
    setDays([
      {
        movements: [{
            name: '',
            amountOfSets: '',
            amountOfReps: '',
          },
        ]
      },
    ]);

    props.getPrograms();
  }

  return (
    <div className="form-container">
      <h1>Create your own program:</h1>
      <form className="programform" onSubmit={submit}>
        <input
          className="form-field"
          type="text"
          placeholder="Title"
          value={values.title}
          onChange={handleTitle}
        />
        <textarea 
          className="form-field"
          placeholder="Description"
          value={values.description}
          onChange={handleDescription}
        />
        {days.map((day, dayIndex) => {
          return (
            <div key={dayIndex}>
              <h2>Day {dayIndex + 1}</h2>
              {day.movements.map((movement, movementIndex) => {
                return(
                  <div key={movementIndex}>
                    <input
                      className=''
                      name='name'
                      placeholder='Movement'
                      value={movement.name}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <input
                      name='amountOfSets'
                      placeholder='Sets'
                      value={movement.amountOfSets}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <input
                      name='amountOfReps'
                      placeholder='Reps'
                      value={movement.amountOfReps}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <button onClick={(event) => removeMovement(event, dayIndex, movementIndex)}>Remove</button>
                  </div>
                )
              })}
              <button onClick={(event) => addMovement(event, dayIndex)} >Add a movement</button>
              <button onClick={(event) => removeDay(event, dayIndex)} >Remove day</button>
            </div>
          )
        })}
        <button onClick={(event) => addDay(event)} >Add a day</button>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
};

export default ProgramForm;