'use client'

import { FormEvent, useState } from 'react';
import Image from 'next/image'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import logoImage from '../assets/logo.svg'
import { TaskItem } from '@/components/TaskItem'

interface Task {
  id: number;
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
      id: new Date().getTime(),
      title: newTask,
    } as Task;

    setTasks(prevState => [...prevState, task]);
    setNewTask('');
  }

  function handleRemoveTask(id: number) {
    const newTasksList = tasks.filter(task => task.id !== id);
    setTasks(newTasksList)
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='listItems'>
          {(provided) => (
            <ul className='flex flex-col my-12 gap-2' {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <TaskItem
                      ref={provided.innerRef}
                      task={task}
                      removeTask={handleRemoveTask}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
