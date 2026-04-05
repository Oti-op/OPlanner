import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks } from 'react-icons/fa'


// toast error
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  // useState hooks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [color, setColor] = useState('gray');

  // API URL
  const API_URL = "http://localhost:4000/api/tasks";

  // fetch the tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL)
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // @ useEffect
  useEffect(() => {
    fetchTasks();
  }, []);

  // colors
  const colorStyles = {
    red: {
      text: "text-red-400",
      border: "border-red-400"
    },
    blue: {
      text: "text-blue-500",
      border: "border-blue-500"
    },
    green: {
      text: "text-green-400",
      border: "border-green-400"
    },
    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-400"
    },
    pink: {
      text: "text-pink-500",
      border: "border-pink-500"
    },
    gray: {
      text: "text-gray-300",
      border: "border-gray-300"
    }
  };


  // handle submit: create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!task) {
        toast.error("Please enter a task!", {
          style: {
            background: "#030712",
            color: "tomato",
            fontSize: "16px",
            borderRadius: "8px"
          }
        });
        return;
      }

      const res = await axios.post(API_URL, {
        task: task,
        color: color,
        taskDone: false,
      }); console.log("task is created", res.data);
      setTask("");
      setColor("gray");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  // handle delete: delete a task
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

// handle it's done: mark as done
const markAsDone = async (task) => {
  try {
    await axios.put(`${API_URL}/${task._id}`, {
      taskDone: !task.taskDone,
    });
    fetchTasks();
  } catch (error) {
    console.error("Error updating task", error);
  }
};


//handle clear all: clears all tasks at once
const clearAll = async () => {
  try {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      await axios.delete(API_URL);
      fetchTasks();
    }
  } catch (error) {
    console.error("Error clearing tasks", error);
  }
};

  return (
    <div className="py-20 px-10 min-h-screen w-full bg-gray-900 flex items-center justify-center text-white">
    
    {/* Container */}
    <div className="w-full max-w-2xl">


      {/* header */}
      <div className="bg-gray-800 w-full h-fit p-5 rounded-xl flex items-center justify-between gap-5">
        {/* left */}
        <div>
          <h1 className="text-3xl mb-2">OPlanner</h1>
          <p>Use this app to remember whatever you want to do </p>
        </div>
       {/* right */}
        <div className="text-5xl text-gray-400">
          <FaTasks></FaTasks>
        </div>
      </div>
      {/* form */}
      <form  onSubmit={handleSubmit}
      className="bg-gray-800 flex justify-between gap-5 p-5 rounded-xl mt-3 w-full">

        <input type="text" 
        placeholder="Write your task here ..." 
        className="px-3 py-2 bg-gray-900 w-full rounded-md outline-0" 
        value={task}
        onChange={(e) => setTask(e.target.value)}/>
      

        {/* colors */}
        <div className="flex items-center gap-4">
          {/* red */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='red'
            checked={color === 'red'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-red-500 block ${color === 'red' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>

              </span>
          </label>

          {/* blue */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='blue'
            checked={color === 'blue'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-blue-500 block ${color === 'blue' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>
                
              </span>
          </label>
          {/* green */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='green'
            checked={color === 'green'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-green-500 block ${color === 'green' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>
                
              </span>
          </label>
          {/* yellow */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='yellow'
            checked={color === 'yellow'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-yellow-500 block ${color === 'yellow' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>
                
              </span>
          </label>
          {/* pink */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='pink'
            checked={color === 'pink'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-pink-500 block ${color === 'pink' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>
              
            </span>
          </label>
          {/* gray */}
          <label className="cursor-pointer">
            <input type="radio"
            name="color"
            value='gray'
            checked={color === 'gray'} 
            onChange={(e) => setColor(e.target.value)}
            className="hidden" />
            <span className={`w-6 h-6 rounded-full bg-gray-500 block ${color === 'gray' 
              ? "border-2 border-white" 
              : "border-2 border-transparent"}`}>
              
            </span>
          </label>
        </div>
        <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md cursor-pointer">Submit</button>
      </form>
          {/* tasks */}
          <ul className="flex flex-col gap-2 w-full mt-3">
            {tasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((task) => (
                            <li key={task._id} className="w-full bg-gray-950 p-2 px-6 py-5 rounded-xl flex justify-between">
                {/* content */}
                <div className={`border-l-4 ${colorStyles[task.color].border} p-3 rounded-md`}>
                  <p className={`text-xl mb-1 ${task.taskDone ? "line-through text-gray-400" : ""}`}>{task.task}</p>
                  <span className="text-sm text-zinc-400">Created on</span>{" "}
                  <span className={`text-sm ${colorStyles[task.color].text} font-bold`}>{new Date(task.createdAt).toLocaleDateString('en-US',
                   { weekday: "long", }
                  )}
                  </span> {" "}
                  <span className={`text-sm ${colorStyles[task.color].text}`}>{new Date(task.createdAt).toLocaleDateString('en-US',
                     { day: "2-digit", month: "long", year: "numeric" })}
                      - {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: true })}</span>
                  </div>
                  {/* buttons */}
                  <div className="flex items-center gap-3">
                    <button className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)}>
                      <FaTrash></FaTrash>
                    </button>
                    <button className="text-gray-400 cursor-pointer text-lg"
                    onClick={() => markAsDone(task)}> {!task.taskDone ? <FaRegCircle></FaRegCircle> : <FaCheckCircle className="text-green-400"></FaCheckCircle>}
                    </button>
                  </div>
                   </li>
            ))}
          </ul>
          {/* clear all tasks */}
          {tasks.length > 0 && (
            <button className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer mt-5 w-full" onClick={clearAll}>
              Clear All Tasks
            </button>
          )}

    </div>
    <ToastContainer />
    </div>
  );
};

export default App