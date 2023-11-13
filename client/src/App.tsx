import { BrowserRouter as Router } from "react-router-dom";
import { UserServiceClient } from "./proto/UserServiceClientPb";
import { AuthServiceClient } from "./proto/AuthServiceClientPb";
import Navigation from "./router/Navigation";
import AppRouter from "./router/Router";
import "./index.css";
import { createContext, useMemo, useState } from "react";
import { MessageServiceClient } from "./proto/MessageServiceClientPb";
import { FilesServiceClient } from "./proto/FilesServiceClientPb";

const userService = new UserServiceClient("http://localhost:8080", null, null);
const authService = new AuthServiceClient("http://localhost:8080", null, null);
const messageService = new MessageServiceClient(
  "http://localhost:8080",
  null,
  null
);
const filesService = new FilesServiceClient(
  "http://localhost:8080",
  null,
  null
);
export const ClientUserContext = createContext(userService);
export const ClientMessageContext = createContext(messageService);
export const ClientAuthContext = createContext(authService);
export const ClientFilesContext = createContext(filesService);

export const ServiceContext = createContext({
  userService,
  messageService,
  authService,
  filesService,
});

const localStorageToken = localStorage.getItem("token");

export const TokenContext: React.Context<{
  token: string | null;
  settoken?: React.Dispatch<React.SetStateAction<string | null>>;
}> = createContext({
  token: localStorageToken,
});

function App() {
  const [token, settoken] = useState(localStorageToken);
  const tokenValue = useMemo(() => ({ token, settoken }), [token]);

  return (
    <Router>
      <ClientUserContext.Provider value={userService}>
        <ClientMessageContext.Provider value={messageService}>
          <ClientAuthContext.Provider value={authService}>
            <ClientFilesContext.Provider value={filesService}>
              <TokenContext.Provider value={tokenValue}>
                <div className="App">
                  <div className="container">
                    <Navigation />
                    <AppRouter />
                  </div>
                </div>
              </TokenContext.Provider>
            </ClientFilesContext.Provider>
          </ClientAuthContext.Provider>
        </ClientMessageContext.Provider>
      </ClientUserContext.Provider>
    </Router>
  );
}

export default App;
