import { Link, Outlet, Route, Routes } from "react-router-dom";

import { ErrorPage, HomePage, Mabel, PlayJass, Terminal } from "pages";
import { Analytics, History, Overview } from "pages/PlayJass";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} errorElement />
      <Route path="/terminal" element={<Terminal />} errorElement />
      <Route path="/mabel" element={<Mabel />} errorElement />
      <Route path="/klaver">
        <Route path="/klaver" element={<Overview />} />
        <Route path="/klaver/history" element={<History />} />
        <Route path="/klaver/play" element={<PlayJass />} />
        <Route path="/klaver/play/:id" element={<PlayJass />} />
        <Route path="/klaver/analytics/:id" element={<Analytics />} />
      </Route>
      <Route path="*" element={<ErrorPage />} errorElement />
    </Routes>
  );
};

export default App;
