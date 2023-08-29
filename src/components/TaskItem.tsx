'use client'

import { forwardRef, Ref, useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'
import { DropResult } from 'react-beautiful-dnd';

import { Subtasks } from './Subtasks';
import { Checkbox } from './Checkbox';

export interface TaskProps {
  id: number;
  title: string;
  isChecked?: boolean;
}

export interface Task extends TaskProps {
  subtasks?: TaskProps[];
}

interface Props {
  task: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
  addSubtask: (taskId: number, subtask: TaskProps) => void;
  removeSubtask: (taskId: number, subtaskId: number) => void;
  toggleSubtaskDone: (taskId: number, subtaskId: number) => void;
  dragSubtask: (taskId: number, result: DropResult) => void;
}

export const TaskItem = forwardRef(function TaskItem({
  task,
  editTask,
  toggleTaskDone,
  removeTask,
  addSubtask,
  removeSubtask,
  toggleSubtaskDone,
  dragSubtask,
  ...rest
}: Props, ref: Ref<HTMLLIElement>) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li
      ref={ref}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className='bg-gray-500 rounded-md p-4 flex items-center'
      {...rest}
    >
      <Checkbox
        id={task.id}
        title={task.title}
        isChecked={task.isChecked}
        onCheckedChange={() => toggleTaskDone(task.id)}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        editTask={editTask}
      />

      {!isEditable && isHovering && (
        <button onClick={() => setIsEditable(true)} className='w-8 h-8 flex justify-center items-center mr-4'>
          <Pencil size={20} className="text-white" />
        </button>
      )}

      <div className='flex gap-2 ml-auto min-w-fit'>
        <Subtasks
          task={task}
          addSubtask={addSubtask}
          removeSubtask={removeSubtask}
          toggleSubtaskDone={toggleSubtaskDone}
          dragSubtask={dragSubtask}
        />

        <button onClick={() => removeTask(task.id)} className='w-8 h-8 flex justify-center items-center'>
          <Trash2 size={20} className="text-red-500" />
        </button>
      </div>
    </li>
  )
});
