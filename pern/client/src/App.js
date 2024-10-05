
import './App.css';
import InputTodo from './components/inputTodo';
import ListTodo from './components/listTodo';
import EditTodo from './components/editTodo';
import React, {Fragment} from 'react';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
        </div>
    </Fragment>
  );
}

export default App;
