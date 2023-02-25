import './App.css';
import Form from "./components/form";
import Sign from './components/signup';
import Login from './components/login';
import Landing from './components/landing';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} ></Route>
          <Route path="signup" element={<Sign />} ></Route>
          <Route path="form" element={<Form />} ></Route>
          <Route path="home" element={<Landing />} ></Route>

          <Route path="*" element={<p>404</p>} ></Route>



        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
