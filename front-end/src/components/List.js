import React, { useState } from "react";
import ListCard from "./ListCard";


export default function List() {
  const initialValue = [{
    id: 1,
    job: "Fazer o almoço",
    status: "done"
  }, 
  {
    id: 2,
    job: "Lavar a louça",
    status: "awaiting"
  },
  {
    id: 3,
    job: "Estudar",
    status: "in progress"
  },
  {
    id: 4,
    job: "Limpar a casa",
    status: "done"
  },
  {
    id: 5,
    job: "Passar a roupa",
    status: "awaiting"
  }];

  const [todos, setTodos] = useState(initialValue);
  const [,setNewtodos] = useState(initialValue);
  
  const onClicks = () => {
    let job = document.getElementById('new-todo');
    let newId = todos[todos.length-1].id
    setNewtodos(todos.push({ id: newId += 1, job: job.value, status:'awaiting' }));
    job.value = ''
  }
    
  return (
    <div>
      <p id="begining">Lista de tarefas</p>
      <ul> 
        {todos.map((todo) => <ListCard key={todo.id}
        todos={todos} setTodos={setTodos} job={todo.job} status={todo.status} id={todo.id}/>)}
      </ul>
      <input placeholder="Adicione nova tarefa" type="text" id="new-todo"/>
      <button type="submit" onClick={onClicks}> Adicionar </button>
    </div>
  )
}
