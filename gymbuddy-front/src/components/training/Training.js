import * as React from "react";
import axios from "axios";
import Select from "react-select";
import TrainingForm from "./TrainingForm";
import "./training.css";

const Training = () => {
  const [program, setProgram] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [day, setDay] = React.useState({});
  const [selectedDay, setSelectedDay] = React.useState("Day 1");
  const [submitted, setSubmitted] = React.useState(false);
  
  React.useEffect(() => {
    const active = JSON.parse(localStorage.getItem('activeProgram'));
    if (active) {
      axios.get(`http://localhost:9000/api/programs/${active}`)
        .then(res => {
          setProgram(res.data);
          let optionsArray = [];
          for (let i = 1; i <= res.data.days.length; i++) {
            // sets the value as the day's index in the "days" array
            optionsArray.push({ value: (i - 1), label: `Day ${i}` });
          }
          setOptions(optionsArray);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }, []);

  React.useEffect(() => {
    if (program !== undefined && program.days !== undefined) {
      setDay(program.days[0]);
    }
  }, [program]);

  const renderSelect = () => {
    if (program !== undefined && program.days !== undefined) {
      if (program.days.length > 1) {
        return <Select className="select" 
          options={options} 
          onChange={handleSelect} 
          defaultValue={{ value: 0, label: "Day 1" }}
          />
      }
    }
  };

  const renderForm = () => {
    if (program.days !== undefined) {
      return <TrainingForm submit={submit} day={day} />;
    }
  }

  const handleSelect = (selectedOption) => {
    setDay(program.days[selectedOption.value]);
    setSelectedDay(selectedOption.label);
  };

  // Submitatessa ei tule inputeista mitään infoa tietokantaan.

  // submit function for TrainingForm
  const submit = (event, inputValues) => {
    event.preventDefault();

    // movements array for the data which is submitted
    const movements = inputValues.map((movement, i) => {

      // sets array of objects for this movement
      const sets = movement.map(set => {
        return(
          {
            weight: set.weight,
            amountOfReps: set.amountOfReps
          }
        );
      });
      
      return(
        {
          name: day.movements[i].name,
          sets: sets
        }
      );
    });


    // the data of type Training
    let dataToSubmit = {
      program: program.title,
      day: selectedDay,
      date: new Date().toDateString(),
      movements: movements
    };

    axios.post('http://localhost:9000/api/', dataToSubmit)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });

    setSubmitted(true);
  };

  return (
    <div className="training">
      {submitted ? <h1>Your training has been saved!</h1> :
        <div>
          {!program.days && <h1>Set an active program from the Programs page!</h1>}
          <h1>{program.title}</h1>
          {renderSelect()}
          {renderForm()}
        </div>
      }
    </div>
  );
};

export default Training;
