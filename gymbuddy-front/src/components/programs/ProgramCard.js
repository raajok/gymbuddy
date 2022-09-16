import React from 'react';
import './programcard.css';
import { Link } from 'react-router-dom';

const ProgramCard = ( props ) => {

  // klikkauksesta pitäis asettaa programs sivulle, että mikä program on aktiivinen
  const handleClick = () => {

  };

  return (
    <div className="programcard">
      <Link to={'/programs/' + props.program["_id"]}>
        <div className="header">{props.program.title}</div>
      </Link>
      <div className="description">
        <button onClick={() => handleClick()} className={"card-button" + (props.active ? "-active" : "")}>Activate</button>
      </div>
    </div>
  );
};

export default ProgramCard;