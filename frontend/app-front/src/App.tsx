import React from 'react';
import logo from './logo.svg';
import './App.css';

enum Steps { toDo, doing, finished }

function App() {
  const [todo, setTodo] = React.useState<string[]>([])
  const [doing, setDoing] = React.useState<string[]>([])
  const [finished, setFinished] = React.useState<string[]>([])

  const [currTask, setCurrTask] = React.useState<string>("")
  const [currStep, setCurrStep] = React.useState<string>("todo")

  const addTask = () => {
    if(currTask) switch(currStep) {
      case "todo":
        setTodo(prev => [...prev,currTask])
        break;
      case "doing":
        setDoing(prev => [...prev,currTask])
        break;
      case "finished":
        setFinished(prev => [...prev,currTask])
        break;
    }
  }

  const changeMe = (id:number, originArr: string[], origin:(p:any) => any, dest:(p:any) => any ) => {
    dest((prev:any) => [...prev, originArr[id]])
    origin((prev:any) => prev.filter((_:any,i:number) => i !== id))
  }

  return (
    <div>
      <h1> Add a Task! </h1>
      <input type="text" value={currTask} onChange={(e) => setCurrTask(e.target.value)} />
      <select value={currStep} onChange={(e) => setCurrStep(e.target.value)}>
        <option value="todo">To do</option>
        <option value="doing">Doing</option>
        <option value="finished">Finished</option>
      </select>
      <button onClick={addTask}> add </button>

      <div style={{display:"flex", width:"100%", justifyContent:"space-evenly"}}>
        <div>
          <h3>To do: </h3>
          <ul>
            {todo.map((t,i) => <li key={i}> {t} 
              <button onClick={() => changeMe(i, todo, setTodo, setDoing)}> d </button>
              <button onClick={() => changeMe(i, todo, setTodo, setFinished)}> f </button>
            </li>)}
          </ul>
        </div>
        <div>
          <h3>Doing: </h3>
          <ul>
            {doing.map((d,i) => <li key={i}> {d} 
              <button onClick={() => changeMe(i, doing, setDoing, setTodo)}> t </button>
              <button onClick={() => changeMe(i, doing, setDoing, setFinished)}> f </button>
            </li>)}
          </ul>
        </div>
        <div>
          <h3>Finished </h3>
          <ul>
            {finished.map((f,i) => <li key={i}> {f} 
              <button onClick={() => changeMe(i, finished, setFinished, setTodo)}> t </button>
              <button onClick={() => changeMe(i, finished, setFinished, setDoing)}> d </button>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
