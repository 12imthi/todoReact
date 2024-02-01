// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import InputForm from './inputForm';
import TotoCard from './totoCard';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedList = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [statusFilter, setStatusFilter] = useState("All");
  //  const[err,seterr] = useState('please write something')


  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);
  // console.log('todolist : ',todoList);
  const handleSubmit = ({ name, description }) => {
    if (name === '' || description === '') {
      console.log('plaese enter');
      //  seterr(err)
    }
    else {

      const newCardId = todoList.length + 1;
      const newCard = {
        id: newCardId,
        name: name,
        description: description,
        status: 'Complete'
      };

      // console.log("Current todoList:", todoList);
      setTodoList([...todoList, newCard]);

      // console.log("Updated todoList:", [...todoList, newCard]);
    }
  };

  const handleEdit = (id, newName, newDescription) => {
    const updatedTodoList = todoList.map(todoid => {
      // console.log(todoid);
      if (todoid.id === id) {
        return {
          ...todoid,
          name: newName,
          description: newDescription,
        };
      }
      return todoid;
    });
    setTodoList(updatedTodoList);
  };

  const deleteClick = (id) => {
    console.log(id);
    const deleteCard = todoList.filter(todo => todo.id !== id);
    setTodoList(deleteCard)
  }


  const updateStatus = (id, newStatus) => {
    console.log("Updating status for todo item with ID:", id);
    console.log("New status:", newStatus);

    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status: newStatus === 'Complete' ? 'Complete' : 'Not Complete'
        };
      }
      return todo;
    });
    console.log("Updated todo list:", updatedTodoList);
    setTodoList(updatedTodoList);
  }



  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredTodoList = todoList.filter(todo => {
    if(statusFilter === 'All') return true;
    return todo.status === statusFilter
  });

  console.log(filteredTodoList);

  return (
    <div className="container">
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <InputForm onSubmit={handleSubmit} />
        </div>
        {/* <div className='col-lg-12 col-md-12 col-sm-12'>
          <p className="text-danger">{err}</p>
        </div> */}
        <div className='col-lg-12 col-md-6 col-sm-12 d-flex justify-content-end'>
          <div className='p-3 mb-2 bg-secondary text-white d-flex justify-content-between align-items-center'>
            <label className='text-danger me-2'>Filter:</label>
            <select className='form-select' value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="All">All</option>
              <option value="Complete">Completed</option>
              <option value="Not Complete">Not Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className='row'>
        {filteredTodoList.map(todo => (
          <TotoCard
            key={todo.id}
            id={todo.id}
            status={todo.status}
            name={todo.name}
            description={todo.description}
            onEdit={handleEdit}
            onDelete={deleteClick}
            onStatus={updateStatus}
          // Corrected prop name
          />
        ))}
      </div>
    </div>
  );
}

export default App;
