import './styles/App.css';
import {Route, Routes, NavLink} from 'react-router-dom'
import QandA from './components/qAndA'
import TeacherAnswer from './components/teacherAnswer';

function App() {
  return (
    <div className="App">
      <QandA />
      <TeacherAnswer />
    </div>
  );
}

export default App;
