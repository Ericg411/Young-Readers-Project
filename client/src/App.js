import './styles/App.css';
import {Route, Routes, NavLink} from 'react-router-dom'
import QandA from './components/qAndA'
import TeacherAnswer from './components/teacherAnswer';
import Home from './components/tempHome'

function App() {
  return (
    <div className="App">
      <TeacherAnswer />
    </div>
  );
}

export default App;
