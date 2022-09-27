import * as React from "react";
import axios from "axios";

const Training = (props) => {
  
  React.useEffect(() => {
    
  }, []);

  return (
    <div className="Training">
      <h1>Hello World</h1>
      <p>{props.active}</p>
    </div>
  );
};

export default Training;
