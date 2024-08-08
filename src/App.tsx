import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Contact from "./pages/contact";
import ChartAndMaps from "./pages/chartAndMaps";
import SideBar from "./components/sideBar";

const App = () => {
  const LayOut = () => {
    return (
      <div className="flex w-full gap-4">
        <div className="w-[20%]">
          <SideBar />
        </div>
        <div className="w-[80%] p-10">
          <Outlet />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="contact" element={<Contact />} />
          <Route path="charts&maps" element={<ChartAndMaps />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
