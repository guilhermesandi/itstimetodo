'use client'

import { FormEvent, useState, useEffect } from 'react';
import Image from 'next/image'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import logoImage from '../assets/logo.svg'
import { Task, TaskItem, TaskProps } from '@/components/TaskItem'
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(
      '@itsTimeTodo:tasks',
    );

    if (storedTasks) {
      return JSON.parse(storedTasks);
    }

    return [];
  });
  

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

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) {
      return;
    }

    foundTask.isChecked = !foundTask.isChecked;

    setTasks(updatedTasks);
  }

  function handleDragTask(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  function handleAddSubtask(taskId: number, subtask: TaskProps) {
    console.log('subtask', subtask)
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === taskId)

    if (!foundTask) {
      return;
    }

    if (foundTask.subtasks) {
      foundTask.subtasks?.push(subtask);
    } else {
      foundTask.subtasks = [subtask];
    }

    setTasks(updatedTasks);
  }

  function handleRemoveSubtask(taskId: number, subtaskId: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === taskId);

    if (!foundTask) {
      return;
    }

    const newSubtasksList = foundTask.subtasks?.filter(subtask => subtask.id !== subtaskId);

    foundTask.subtasks = newSubtasksList;

    setTasks(updatedTasks)
  }

  function handleToggleSubtaskDone(taskId: number, subtaskId: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === taskId)

    if (!foundTask) {
      return;
    }

    const foundSubtask = foundTask.subtasks?.find(subtask => subtask.id === subtaskId)

    if (!foundSubtask) {
      return;
    }

    foundSubtask.isChecked = !foundSubtask.isChecked;

    setTasks(updatedTasks);
  }

  useEffect(() => {
    localStorage.setItem(
      '@itsTimeTodo:tasks',
      JSON.stringify(tasks),
    );
  }, [tasks]);

  return (
    <div className='flex max-w-3xl flex-col mx-auto px-4'>
      <header className='py-4'>
        <Image src={logoImage} width={120} alt="It's Time To-do" />
      </header>

      <h1 className='text-5xl font-mono text-white mt-16 mb-6'>Manage your tasks.</h1>

      <form className='flex rounded-md overflow-hidden' onSubmit={handleAddTask}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Write your task here..."
          className='flex flex-1 p-4'
        />
        <button type="submit" className='bg-primary flex justify-center items-center px-6 text-lg font-semibold text-white'>
          <ChevronRight />
        </button>
      </form>

      <DragDropContext onDragEnd={handleDragTask}>
        <Droppable droppableId='listItems'>
          {(provided) => (
            <ul className='flex flex-col my-12 gap-2' {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <TaskItem
                      ref={provided.innerRef}
                      task={task}
                      toggleTaskDone={handleToggleTaskDone}
                      removeTask={handleRemoveTask}
                      addSubtask={handleAddSubtask}
                      removeSubtask={handleRemoveSubtask}
                      toggleSubtaskDone={handleToggleSubtaskDone}
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
