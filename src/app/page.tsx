'use client'

import { FormEvent, useState } from 'react';
import Image from 'next/image'

import logoImage from '../assets/logo.svg'
import { TaskItem } from '@/components/TaskItem'

interface Task {
  title: string;
  isChecked?: boolean;
}

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!newTask) {
      return;
    }

    const task = {
      title: newTask,
    } as Task;

    setTasks(prevState => [...prevState, task]);
    setNewTask('');
  }

  return (
    <div className='flex max-w-3xl flex-col mx-auto px-4'>
      <header className='py-4'>
        <Image src={logoImage} width={120} alt="It's Time To-do" />
      </header>

      <h1 className='text-5xl font-mono text-white mt-16 mb-6'>Organize your tasks.</h1>

      <form className='flex rounded-md overflow-hidden' onSubmit={handleAddTask}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Write your task here..."
          className='flex flex-1 p-4'
        />
        <button type="submit" className='bg-primary flex justify-center items-center px-8 text-lg font-semibold text-white'>
          Add task
        </button>
      </form>

      <div className='flex flex-col my-12 gap-2'>
        {tasks.map(task => (
          <TaskItem key={task.title} title={task.title} />
        ))}
      </div>
    </div>
  )
}
