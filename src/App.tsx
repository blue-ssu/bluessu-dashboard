import { RouterProvider } from "react-router-dom";
import { indexRouter } from "./router";

function App() {
    return <RouterProvider router={indexRouter} />;
}

export default App;
