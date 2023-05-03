import { ErrorPage, HomePage, Terminal } from "pages";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement />
        <Route path="/terminal" element={<Terminal />} errorElement />
        <Route path="*" element={<ErrorPage />} errorElement />
      </Routes>
    </>
  );
};

export default App;
