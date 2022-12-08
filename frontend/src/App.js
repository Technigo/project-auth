import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Register from 'components/Register';
import Login from 'components/Login';
import Content from 'components/Content';
import SpeakerDetails from 'components/SpeakerDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/top10Views" element={<Content />} />
        <Route path="/speaker/:id" element={<SpeakerDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
