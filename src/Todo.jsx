import { useState } from "react";
// creating a todo app
function Todo() {
  const [tasks, setTasks] = useState([
    "Eat Breakfast",
    "Take a shower",
    "Wake Up",
  ]);

  const [newTask, setNewTask] = useState("");

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  function handleAddTask(e) {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  function handleRemoveTask(index) {
    setTasks(tasks.filter((element, i) => i !== index));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">To do app</h1>
        <form onSubmit={handleAddTask} className="mb-4">
          <input
            type="text"
            placeholder="New Task"
            onChange={(e) => handleChange(e)}
            value={newTask}
            className="p-2 mr-2 border rounded"
          />
          <button type="submit" className="p-2 text-white bg-blue-500 rounded">
            Add Task
          </button>
        </form>
        {tasks.map((task, index) => {
          return (
            <li key={index} className="flex items-center justify-between mb-2">
              <span>{task}</span>
              <div>
                <button
                  type="button"
                  className="p-2 ml-2 text-black bg-gray-300 rounded"
                  onClick={() => moveTaskUp(index)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="p-2 ml-2 text-black bg-gray-300 rounded"
                  onClick={() => moveTaskDown(index)}
                >
                  ↓
                </button>
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="p-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Todo;
