import { Link, Outlet, Route, Routes } from "react-router-dom";

import { ErrorPage, HomePage, Mabel, PlayJass, Terminal } from "pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement />
        <Route path="/terminal" element={<Terminal />} errorElement />
        <Route path="/mabel" element={<Mabel />} errorElement />
        <Route path="/klaver" element={<PlayJass />} errorElement />
        <Route path="*" element={<ErrorPage />} errorElement />
      </Routes>
    </>
  );
};

export default App;
