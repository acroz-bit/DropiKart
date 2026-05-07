import Home from "./components/Home";
import AnalysePdct from "./components/AnalysePdct";
import History from "./components/History";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <div><Navbar/> <Home/></div>},
  { path: "/analyse", element: <div><Navbar/> <AnalysePdct/></div> },
  { path: "/history", element: <div><Navbar/> <History/></div> },
  { path: "/about", element: <div><Navbar/> <About/></div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;