import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoDescription, setTodoDescription] = useState(todo.description);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editAndUpdate = () => {
    if (isTodoEditable) updateTodo(todo.id, { description: todoDescription });
    setIsTodoEditable(!isTodoEditable);
  };

  return (
    <div className="flex items-center bg-gray-700 dark:bg-gray-300 text-white dark:text-black p-3 rounded-lg">
      <button
        className={`w-6 h-6 rounded-full flex items-center justify-center transition  ${
          todo.isCompleted ? "bg-green-500" : "bg-gray-600 dark:bg-gray-400"
        }`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.isCompleted && <span className="text-white font-bold">✅</span>}
      </button>
      <input
        value={todoDescription}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoDescription(e.target.value)}
        className={`ml-3 flex-1 bg-transparent text-white dark:border-gray-400 dark:text-black ${
          isTodoEditable ? "border-b border-gray-500" : ""
        } focus:outline-none ${todo.isCompleted ? "line-through" : ""}`}
      />
      <button
        onClick={editAndUpdate}
        className="text-blue-400 hover:text-blue-500 ml-2"
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-400 hover:text-red-500 ml-2"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;
