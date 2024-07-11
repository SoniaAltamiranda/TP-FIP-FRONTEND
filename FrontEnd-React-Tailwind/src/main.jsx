
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PropertiesProvider } from "../src/context/propertiesContext.jsx";
// import { UsersProvider } from "../src/context/usersContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById("root")).render(

  <>
    <StrictMode>
      <AuthProvider>
        <PropertiesProvider>
          {/* <UsersProvider> */}
          <BrowserRouter>

            <App />
          </BrowserRouter>
          {/* </UsersProvider> */}
        </PropertiesProvider>
      </AuthProvider>
    </StrictMode>
  </>
);
