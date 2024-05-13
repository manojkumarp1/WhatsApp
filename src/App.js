import { Routes,Route } from "react-router-dom";
import HomePage from "./Components/HomePage"
import Status from "./Components/Status/Status"
import StatusViewer from "./Components/Status/StatusViewer";
import Signin from "./Components/Register/Signin";
import Signup from "./Components/Register/Signup";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status/:userId" element={<StatusViewer />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </div>
  );
}

export default App;
