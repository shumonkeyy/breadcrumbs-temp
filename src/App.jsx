import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolOneMap from "./pages/SchoolOneMap";
import Start from "./pages/Spawn";
import SchoolOneClubs from "./pages/SchoolOneClubs";
import { SchoolContextProvider } from "./context/Context";
import SchoolOneFAQ from "./pages/SchoolOneFAQ";
import Footer from "./components/Footer";
import SchoolTwoMap from "./pages/SchoolTwoMap";
import SchoolTwoClubs from "./pages/SchoolTwoClubs";
import SchoolTwoFAQ from "./pages/SchoolTwoFAQ";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <SchoolContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/school-one-map" element={<SchoolOneMap />} />
          <Route path="/school-one-clubs" element={<SchoolOneClubs />} />
          <Route path="/school-one-faq" element={<SchoolOneFAQ />} />
          <Route path="/school-two-map" element={<SchoolTwoMap />} />
          <Route path="/school-two-clubs" element={<SchoolTwoClubs />} />
          <Route path="/school-two-faq" element={<SchoolTwoFAQ />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <div
          id="google_translate_element"
          style={{
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
      </Router>
      <Footer />
    </SchoolContextProvider>
  );
}

export default App;
