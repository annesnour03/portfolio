import { Link, Outlet, Route, Routes } from "react-router-dom";

import { ErrorPage, HomePage, Mabel, Terminal } from "pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement />
        <Route path="/terminal" element={<Terminal />} errorElement />
        <Route path="/mabel" element={<Mabel />} errorElement />
        <Route path="*" element={<ErrorPage />} errorElement />
      </Routes>
    </>
  );
};

export default App;
