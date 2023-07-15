import React, {useEffect} from "react";
import Context from "./context";
import TodoList from "./Todo/TodoList";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=20')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(todos.map( todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(
      todos.concat({
        title,
        id: Date.now(),
        completed: false
      })
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>
          Todo-лист
        </h1>
        <Modal />
        <React.Suspense fallback={<p> Загрузка..... </p>}>
          <AddTodo  onCreate={addTodo}/>
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ?  <TodoList todos={todos} onToggle={toggleTodo} /> : loading ? null :( <p>'У вас нет задач'</p>)}
      </div>
    </Context.Provider>
  )
}

export default App;
