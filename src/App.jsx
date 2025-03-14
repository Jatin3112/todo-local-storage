import { useEffect, useState } from "react";
import { ThemeContextProvider, TodoContextProvider } from "./contexts";
import { TodoForm, TodoItem, ThemeBtn } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("dark");

  const addTodo = (todo) => {
    setTodos([
      { id: Date.now(), description: todo.description, isCompleted: false },
      ...todos,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, description: todo.description }
          : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem("todos"));
    if (todosLocalStorage && todosLocalStorage.length > 0) {
      setTodos(todosLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  };

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <ThemeContextProvider value={{ theme, toggleTheme }}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white dark:bg-white dark:text-black">
          <div className="w-full max-w-md bg-gray-800 dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Team Todo</h1>
            <div className="absolute top-4 right-4">
              <ThemeBtn />
            </div>
            <TodoForm className="dark:bg-gray-200 dark:text-black" />
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  className="bg-gray-700 dark:bg-gray-300 text-white dark:text-black p-3 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </ThemeContextProvider>
    </TodoContextProvider>
  );
}

export default App;
