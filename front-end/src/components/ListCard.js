import React from 'react'

export default function ListCard(props) {

  const {job, status, id, setTodos, todos} = props

  const renderDropDown = (status) => {
    return (
      <select name="select" defaultValue={status}>
      <option value="awaiting" >awaiting</option>
      <option value="in progress" >in progress</option>
      <option value="done" >done</option>
    </select>
    )
  }

  const renderRemove = (value) => {
    return (
      <button onClick={() => {setTodos(todos.filter(item => item.id !== value))}}>Remover</button>
    )
  }


  const renderLi = (name, status, id) => {
    return (
      <li onClick={() => changeJob()} key={id}> <span>{name}</span>  - {renderDropDown(status)} - {renderRemove(id)}</li>
      )
};

  const changeJob = () => {
    const newInputField = document.getElementById("newjob");
    if(newInputField) {
      return
    } else {
      document.querySelectorAll("span").forEach((event) => {
        event.ondblclick = function(){
          const val = this.innerHTML;
          const input = document.createElement("input");
          input.setAttribute('id', 'newjob')
          input.value = val;
          input.onblur = function(){
            const val = this.value;
            this.parentNode.innerHTML = val;
          }
          this.innerHTML = "";
          this.appendChild(input);
          input.focus();
        }
      });
    }
  }

  return (
    <div>
      {renderLi(job, status, id)}
    </div>
  )
}
