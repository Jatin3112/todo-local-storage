import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todoDescription.trim()) return;
    addTodo({ description: todoDescription });
    setTodoDescription("");
  };

  return (
    <form onSubmit={add} className="flex space-x-2 mb-4">
      <input
        className="w-full p-2 rounded-lg bg-gray-700 dark:bg-gray-300 text-white dark:text-black p-3 rounded-lg focus:outline-none"
        placeholder="Add a new task..."
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
