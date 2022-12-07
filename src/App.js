import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import ipConfig from "./ipConfig.json";
import React from "react";
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const config = {
  endpoint: `https://qkarrt-in.herokuapp.com/api/v1`,
};

function App() {
  return (
    <React.StrictMode>  
    <BrowserRouter> 
    <ThemeProvider theme={theme}>
    <div className="App">
    <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/thanks">
          <Thanks />
        </Route>
      </Switch>                   
    </div> 
    </ThemeProvider>    
    </BrowserRouter>  
    </React.StrictMode>    
  );
}

export default App;
