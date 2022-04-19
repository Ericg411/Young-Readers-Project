import './styles/App.css';
import {Route, Routes, NavLink} from 'react-router-dom'
import QandA from './ericcomponents/qAndA'
import TeacherAnswer from './ericcomponents/teacherAnswer';

function App() {
  return (
    <div className="App">
      <QandA />
      <TeacherAnswer />
    </div>
  );
}

export default App;
