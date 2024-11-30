import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard";

function App() {

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
