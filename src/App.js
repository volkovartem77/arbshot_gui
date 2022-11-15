import React from 'react';
import {Provider} from "react-redux";
// import Header from "./components/Header";
import TabsPanel from "./components/TabsPanel";
import configureStore from "./store/store";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <div>
          {/*<Header/>*/}
          <TabsPanel/>
        </div>
      </Provider>
  );
}

export default App;