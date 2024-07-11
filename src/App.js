import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";

import Home from "./pages/Home";
import BookManage from "./pages/BookManage";
import SellManage from "./pages/SellManage";
import ShopManage from "./pages/SellManage";
import Processing from "./pages/Processing";
import Exit from "./pages/Exit";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/"} element={<BookManage/>}/>
          <Route path={"/"} element={<SellManage/>}/>
          <Route path={"/"} element={<ShopManage/>}/>
          <Route path={"/"} element={<Processing/>}/>
          <Route path={"/"} element={<Exit/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
