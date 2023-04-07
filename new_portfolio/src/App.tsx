import { Routes, Route, Outlet, Link } from "react-router-dom";
import { HomePage } from "pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Utilities" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
