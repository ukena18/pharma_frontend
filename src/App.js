import OrderAdd from "./pages/order_add";
import PersonAdd from "./pages/person_add";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/login_page";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Navbar from "./components/navbar";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./controllers/hello";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/hello" element={<Hello />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/add_order/:pk" element={<OrderAdd />} />
          <Route path="/add_person" element={<PersonAdd />} />
          <Route path="/login_page" element={<LoginPage />} />
          <Route path="/profile/:pk" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
