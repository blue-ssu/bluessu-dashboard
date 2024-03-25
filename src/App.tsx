import { RouterProvider } from "react-router-dom";
import { indexRouter } from "./router";

import "./styles/hero.css";

function App() {
  return <RouterProvider router={indexRouter} />;
}

export default App;
