'use client'

import { FormEvent, useState, useEffect } from 'react';
import Image from 'next/image'
import { ChevronRight } from 'lucide-react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import logoImage from '../assets/logo.svg'

import { Task, TaskItem, TaskProps } from '@/components/TaskItem'
import { Input } from '@/components/Input';

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

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

  function handleDragSubtask(taskId: number, result: DropResult) {
    if (!result.destination) {
      return;
    }

    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === taskId);

    if (!foundTask) {
      return;
    }

    if (foundTask.subtasks) {
      const items = Array.from(foundTask.subtasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      foundTask.subtasks = items;

      setTasks(updatedTasks);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('entrou');
      
      const storedTasks = localStorage.getItem(
        '@itsTimeTodo:tasks',
      );
  
      console.log('storedTasks', storedTasks)
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        setIsLoading(false);

        return;
      }
  
      setTasks([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        '@itsTimeTodo:tasks',
        JSON.stringify(tasks),
      );
    }
  }, [tasks, isLoading]);

  return (
    <div className='flex max-w-3xl flex-col mx-auto px-4'>
      <header className='py-4'>
        <Image src={logoImage} width={120} alt="It's Time To-do" />
      </header>

      <h1 className='text-5xl font-mono text-white mt-16 mb-6'>Manage your tasks.</h1>

      <form onSubmit={handleAddTask}>
        <Input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Write your task here..."
        />
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
                      dragSubtask={handleDragSubtask}
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
