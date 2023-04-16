import { Routes, Route, Outlet, Link } from "react-router-dom";
import { HomePage, ErrorPage,Terminal } from "pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement />
        <Route path="*" element={<ErrorPage />} errorElement />
      </Routes>
    </>
  );
};

export default App;
