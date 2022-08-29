import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./component/form";
import List from "./component/list";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/edit/:id" element={<Form />} />
          <Route path="/add" element={<Form />} />
          <Route path="/" element={<List />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
