import Home from "./components/Home";
import AnalysePdct from "./components/AnalysePdct";
import History from "./components/History";
import About from "./components/About";
import Navbar from "./components/Navbar";
import "./App.css";

import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Layout = ({ children }) => {
  useEffect(() => {
    // #region agent log: layout computed style snapshot
    const layoutEl = document.querySelector(".layout");
    const sidebarEl = document.querySelector(".sidebar");
    const homeEl = document.querySelector(".home-page");

    const safeRect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    };

    const safeStyles = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        flexDirection: cs.flexDirection,
        flexWrap: cs.flexWrap,
        position: cs.position,
        width: cs.width,
        minWidth: cs.minWidth,
        maxWidth: cs.maxWidth,
      };
    };

    fetch("http://127.0.0.1:7594/ingest/659b5490-f808-46f8-8080-9f2b9e07828e", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "ff82bf",
      },
      body: JSON.stringify({
        sessionId: "ff82bf",
        runId: "pre-fix",
        hypothesisId: "H_layout_styles",
        location: "src/App.jsx:Layout(useEffect)",
        message: "Computed layout/sidebar/home styles + rects",
        data: {
          viewport: { w: window.innerWidth, h: window.innerHeight },
          layout: { styles: safeStyles(layoutEl), rect: safeRect(layoutEl) },
          sidebar: { styles: safeStyles(sidebarEl), rect: safeRect(sidebarEl) },
          home: { styles: safeStyles(homeEl), rect: safeRect(homeEl) },
          stylesheets: Array.from(document.styleSheets || []).map((ss) => ({
            href: ss?.href || null,
            ownerNodeTag: ss?.ownerNode?.tagName || null,
          })),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log
  }, []);

  return (
    <div className="layout">
      <Navbar />
      {children}
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;