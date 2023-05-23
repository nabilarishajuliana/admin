import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNews from "./pages/article/AddNews";
import News from "./pages/article/News";
import UpdateNews from "./pages/article/UpdateNews";
import ViewNews from "./pages/article/ViewNews";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/view/:id" element={<ViewNews />} />
        <Route path="/news/new" element={<AddNews />} />
        <Route path="/news/edit/:id" element={<UpdateNews />} />
        {/* <Route path="/gallery/:id" element={<Gallery />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
