'use client'

import { useState, forwardRef, Ref } from 'react'
import { Check, Trash2, Network } from 'lucide-react'
import * as Checkbox from '@radix-ui/react-checkbox'

interface Task {
  id: number;
  title: string;
  isChecked?: boolean;
}

interface Props {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export const TaskItem = forwardRef(function TaskItem({ task, toggleTaskDone, removeTask, ...rest }: Props, ref: Ref<HTMLLIElement>) {
  return (
    <li ref={ref} className='bg-light-black rounded-md p-4 flex justify-between items-center' {...rest}>
      <Checkbox.Root
        onCheckedChange={() => toggleTaskDone(task.id)}
        checked={task.isChecked}
        disabled={false}
        className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      >
        <div className="h-8 w-8 rounded-md flex items-center justify-center border-2 border-white group-data-[state=checked]:bg-primary group-data-[state=checked]:border-primary transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-background">
          <Checkbox.Indicator>
            <Check size={20} className="text-white" />
          </Checkbox.Indicator>
        </div>

        <span className="font-semibold text-xl text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
          {task.title}
        </span>
      </Checkbox.Root>

      <div className='flex gap-2'>
        <button onClick={() => removeTask(task.id)} className='w-8 h-8 flex justify-center items-center'>
          <Network size={20} className="text-white" />
        </button>

        <button onClick={() => removeTask(task.id)} className='w-8 h-8 flex justify-center items-center'>
          <Trash2 size={20} className="text-white" />
        </button>
      </div>
    </li>
  )
});
