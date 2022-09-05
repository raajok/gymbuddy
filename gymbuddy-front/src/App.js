import * as React from "react";
import axios from "axios";

const App = () => {
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:9000/testAPI')
      .then(res => {
        setResponse(res.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>{response}</p>
    </div>
  );
};

export default App;
