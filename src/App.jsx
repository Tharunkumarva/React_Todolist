import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const addTodo = () => {
    if (taskName.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: 'not completed',
    };

    setTodos([...todos, newTodo]);
    setTaskName('');
    setTaskDescription('');
  };

  const changeStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === 'not completed' ? 'completed' : 'not completed' }
        : todo
    );

    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newName = prompt('Edit Task Name:', todo.name);
        if (newName !== null) {
          return { ...todo, name: newName };
        }
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className='row-1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'green' }}>My Todo</h1>
      </div>

      <div className="row-2" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="add-todo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <input
            type="text" style={{ height: '100%', width: '8cm', border: '1px solid green', padding: '4px' }}
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text" style={{ height: '100%', width: '8cm', border: '1px solid green', padding: '4px' }}
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button onClick={addTodo} style={{ height: '100%', width: '3cm', border: '1px solid green', padding: '4px', backgroundColor: 'green' }}>Add Task</button>
        </div>
      </div>

      <div className='row-3' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>My Todos</h3>
        </div>
        <div>
          <div className='filter-status'>
            <label>Filter by Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not completed">Not Completed</option>
            </select>
          </div>
        </div>
      </div>
      <div className='row-4' style={{ display: 'flex' }}>
  <div className='cart-1' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '10px', width: '100%' }}>
    {todos.map((todo) => (
      <div className='todo-card' key={todo.id} style={{ width: '8cm', height: '6cm', margin: '10px', backgroundColor: '#98FB98'}}>
        <div className="todo-card" style={{ flex: '1' }}>
          <div><h3>Name &nbsp;: &nbsp;{todo.name}</h3></div>
          <div><p>Description &nbsp;: &nbsp;{todo.description}</p></div>
          <div>
            <div className="status" onClick={() => changeStatus(todo.id)}>
              Status&nbsp;
              <select
                value={todo.status}
                onChange={(e) => changeStatus(todo.id, e.target.value)}
                className={todo.status === 'completed' ? 'green' : 'red'}
              >
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </select>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => editTodo(todo.id)} style={{ backgroundColor: 'green' }}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)} style={{ backgroundColor: 'orange' }}>Delete</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      
    </div>
  );
}

export default App;
