import React, {Fragment, useState, useEffect} from 'react';
import EditTodo from "./editTodo";

const ListTodo = () => {

  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const res = await fetch("http://localhost:5000/todos");

    const todosArray = await res.json();

    setTodos(todosArray);
  }

  useEffect(() =>{
    getTodos();
  }, [])

  //delete todo
  async function deleteTodo(id) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch(err) {
      console.error(err.message);
    }
  }


  return(
    <Fragment>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
         {/*<tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
};

export default ListTodo;