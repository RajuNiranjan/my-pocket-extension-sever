import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Contact from "./pages/contact";
import ChartAndMaps from "./pages/chartAndMaps";
import SideBar from "./components/sideBar";

const App = () => {
  const LayOut = () => {
    return (
      <div className="flex flex-col md:flex-row  w-full gap-4">
        <div className="md:w-[20%]  z-50 sticky top-0">
          <SideBar />
        </div>
        <div className="md:w-[80%]  p-4">
          <Outlet />
        </div>
      </div>
    );
  };

  const NavBar = () => {
    const location = useLocation();
    return (
      <div className="h-14 sticky top-0  shadow-md text-center sm:flex justify-center items-center text-4xl text-black hidden ">
        <h1 className="font-medium  capitalize ">
          {location.pathname === "/" ? "Contact" : "Charts and Maps"}
        </h1>
      </div>
    );
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="" element={<Contact />} />
          <Route path="charts&maps" element={<ChartAndMaps />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
