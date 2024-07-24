import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CustomRoutes from "./routes";
import GlobalContextProvider from "./contexts/GlobalContext";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <CustomRoutes />
      </GlobalContextProvider>
    </Provider>
  );
};

export default App;
