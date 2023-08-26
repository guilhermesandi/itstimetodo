'use client'

import { forwardRef, Ref } from 'react'
import { Check, Trash2, Network } from 'lucide-react'

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
  removeTask: (id: number) => void;
  addSubtask: (taskId: number, subtask: TaskProps) => void;
  removeSubtask: (taskId: number, subtaskId: number) => void;
  toggleSubtaskDone: (taskId: number, subtaskId: number) => void;
}

export const TaskItem = forwardRef(function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  addSubtask,
  removeSubtask,
  toggleSubtaskDone,
  ...rest
}: Props, ref: Ref<HTMLLIElement>) {
  return (
    <li ref={ref} className='bg-gray-500 rounded-md p-4 flex justify-between items-center' {...rest}>
      <Checkbox
        title={task.title}
        isChecked={task.isChecked}
        onCheckedChange={() => toggleTaskDone(task.id)}
      />

      <div className='flex gap-2'>
        <Subtasks
          task={task}
          addSubtask={addSubtask}
          removeSubtask={removeSubtask}
          toggleSubtaskDone={toggleSubtaskDone}
        />

        <button onClick={() => removeTask(task.id)} className='w-8 h-8 flex justify-center items-center'>
          <Trash2 size={20} className="text-white" />
        </button>
      </div>
    </li>
  )
});
