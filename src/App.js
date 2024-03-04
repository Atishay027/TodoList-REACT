
import './App.css';
import {useState} from 'react'

function TodoItem({ todo , handleDelete, handleEdit }){
    const [isEditing, setIsEditing] =  useState(false);
    const [text,setText] = useState(todo.text);
    
    const HandleInputChange = (e) =>{
        setText(e.target.value);
    };
      
    const handleSave = () =>{
        handleEdit(todo.id, text);
        setIsEditing(false);
    }; 
   

    return(
      <li  >
         {isEditing ? (<input type="text" 
                              value={text}
                              onChange = {HandleInputChange}
                              autoFocus
                              onBlur={handleSave}
                              onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                           handleSave();
                                        }
                                    } } />)
                    :(
                      <>
                      <span>{todo.text}</span>
                      <button className="edit"onClick={() => setIsEditing(true)}>Edit</button>
                      </>
                       )     
          }                 
       <button  className="delete"onClick={() => handleDelete(todo.id)}>Delete</button>
      </li>
      );

}

function App() {
   
  const [inputvalue,setInputValue] = useState('');
  const [todo,setTodo]  = useState([]);
  const [idCounter,setIdCounter] = useState(0);
 
  const handleChange = (e)=>{
          setInputValue(e.target.value)
  };

  const handleClick = (e)=>{
      e.preventDefault()
       if(inputvalue.trim() !== '') 
       {
       setTodo([...todo, {id:idCounter,text:inputvalue}]);
       setIdCounter(idCounter+1);
       setInputValue('');
      }
  };
  const handleDelete = (id) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
  };

  

  const handleEdit = (id,newText)=>{
       const updateTodo =todo.map((item) =>
       item.id === id ? { ...item, text: newText } : item
     );
     setTodo(updateTodo);
  };


  return (
    <>
    <h1 >TODO LIST</h1>
    <form className="TodoForm">

      <input type="text" className="todo-input"placeholder = "Write what the task for today?" value={inputvalue} onChange={handleChange}/>
      <button className="todo-button" onClick= {handleClick} >Add TASK</button>
      <ul className="list">
     { todo.map((item) =>(
      <TodoItem  className="todo-item"
          key={item.id} 
          todo={item}
          handleDelete={handleDelete} 
          handleEdit={handleEdit} />
     ))}
    </ul>

    </form>
    
    </>
  );
}

export default App;



