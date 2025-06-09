import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import SubmissionResult from './components/SubmissionResult';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/result" element={<SubmissionResult />} />
      </Routes>
    </Router>
  );
}

export default App;
