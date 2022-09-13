import * as React from "react";
import axios from "axios";

const Training = () => {
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:9000/api/testAPI')
      .then(res => {
        setResponse(res.data);
      })
      .catch(error => {
        setResponse("API is not working!");
        console.log(error.toJSON());
      });
  }, []);

  return (
    <div className="Training">
      <h1>Hello World</h1>
      <p>{response}</p>
    </div>
  );
};

export default Training;
