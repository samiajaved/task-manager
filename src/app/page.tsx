'use client';
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";

export default function Home() {
  
  const [tasks, setTasks] = useState([]); //initialize state for task
  const inputReference = useRef(null);      //reference for the input field

  const HandleAddTask = () => {
    const inputValue = inputReference?.current?.value as string;
    setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);

    if (inputReference.current) {  //clear the input field after pressing enter
      inputReference.current.value = " ";
    }
  };

  const HandleKeyPress = (event: React.KeyboardEvent) => { //add task by pressing enter
    if (event.key === "Enter")
      HandleAddTask();
  };

  const HandleScrollPage = (event: React.KeyboardEvent) => { //handle scrolling
    if (event.key === "Lower Key")
      Home();
  };

  const deleteTask = (id: string) => { // Function to delete a task
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div onScroll={HandleScrollPage}>
      <h1 className="text-4xl font-serif text-center font-bold m-6">Task Manager</h1>

      <div className="mt-10 flex gap-4">
        <input ref={inputReference} onKeyDown={HandleKeyPress} placeholder="enter your task here" className="border-2 border-black w-[400px] h-[40px] rounded-md lg:ml-[400px] px-2" />

        <button onClick={HandleAddTask} className="bg-black text-white px-3 w-[100px] h-[40px] rounded-md hover:bg-white hover:text-black hover:border-black hover:border-2">add Task</button>
      </div>
      
      {tasks.length === 0 ? <h1 className="lg:ml-[400px] mt-4 ">No Task Available</h1> : tasks.map((elem) => {
        return (
          <div key={elem.id} className="mt-4 w-[490px] lg:w-[510px] lg:ml-[400px]">
            <ul className="flex justify-between">
              <li>{elem.title}</li>
              <button onClick={() => deleteTask(elem.id)}>
                <Image src="/images/bin.png" alt="delete" width={30} height={30} className="p-1" />
              </button>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
