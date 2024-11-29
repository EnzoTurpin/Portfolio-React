import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function MainApp() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainApp;
