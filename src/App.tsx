import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";

import "./App.css";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
};

export default App;
