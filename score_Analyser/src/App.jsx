import Home from "./components/Home";
import AnalysePdct from "./components/AnalysePdct";
import History from "./components/History";
import About from "./components/About";
import Navbar from "./components/Navbar";
import "./App.css";
import Result from "./components/Result";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />

      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/analyse",
    element: (
      <Layout>
        <AnalysePdct />
      </Layout>
    ),
  },
  {
    path: "/history",
    element: (
      <Layout>
        <History />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/result",
    element: (
      <Layout>
        <Result />
      </Layout>
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;