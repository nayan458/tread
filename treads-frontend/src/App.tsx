// import BaseLayout from '@layouts/BaseLayout';
// import Home from '@views/Home/Home';

import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Home/> */}
      {/* <BaseLayout/> */}
    </>
  );
}
export default App;
