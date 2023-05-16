import './App.css';
import { Routes, Route } from "react-router-dom";
import MeterList from './components/MeterList';
import MeterDetails from './components/MeterDetails';
import NoMatch from './components/NoMatch';
import MeterForm from './components/MeterForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MeterList />} />
        <Route path="createMeter" element={<MeterForm />} />
        <Route path="editMeter/:id" element={<MeterForm />} />
        <Route path="meters/:id" element={<MeterDetails />} />
        <Route path="*" element={<NoMatch message="The page you're looking for is not here!" />} />
      </Routes>
    </div>
  );
}

export default App;
