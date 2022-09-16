import React from 'react';
import { useParams } from 'react-router-dom';

const Program = () => {


  let { programId } = useParams();

  return (
    <div>{programId}</div>
  );
};

export default Program;