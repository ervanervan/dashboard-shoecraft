import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AddDataPage from "./pages/AddDataPage";
import EditDataPage from "./pages/EditDataPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/add-data" element={<AddDataPage />}></Route>
        <Route path="/edit-data/:id" element={<EditDataPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
