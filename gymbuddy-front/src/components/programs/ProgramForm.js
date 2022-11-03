import React from 'react';
import './programform.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
              <div className='day-header'>
                <h2>Day {dayIndex + 1}</h2>
                <button className='small-button' onClick={(event, dayIndex) => removeDay(event, dayIndex)} >
                  <FontAwesomeIcon className='icon' icon={faTrashCan} />
                </button>
              </div>
              {day.movements.map((movement, movementIndex) => {
                return(
                  <div key={movementIndex}>
                    <input
                      className='input'
                      name='name'
                      placeholder='Movement'
                      value={movement.name}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <input
                      className='input'
                      name='amountOfSets'
                      placeholder='Sets'
                      value={movement.amountOfSets}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <input
                      className='input'
                      name='amountOfReps'
                      placeholder='Reps'
                      value={movement.amountOfReps}
                      onChange={event => handleMovement(dayIndex, movementIndex, event)}
                    />
                    <button className='small-button' onClick={(event) => removeMovement(event, dayIndex, movementIndex)}>
                      <FontAwesomeIcon className='icon' icon={faTrashCan} />
                    </button>
                    <button className='small-button' onClick={(event) => addMovement(event, dayIndex)} >
                      <FontAwesomeIcon className='icon' icon={faPlus} />
                    </button>
                  </div>
                )
              })}
            </div>
          )
        })}
        <div>
          <button className='big-button' onClick={(event) => addDay(event)} >Add a day</button>
          <button className='big-button' onClick={submit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;