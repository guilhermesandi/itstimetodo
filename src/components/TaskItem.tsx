'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import * as Checkbox from '@radix-ui/react-checkbox'

interface Props {
  title: string;
}

export function TaskItem({ title }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  function handleToggleTask() {
    setIsChecked(prevState => !prevState);
  }

  return (
    <div className='bg-light-black rounded-md p-4'>
      <Checkbox.Root
        onCheckedChange={handleToggleTask}
        checked={isChecked}
        disabled={false}
        className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      >
        <div className="h-8 w-8 rounded-md flex items-center justify-center border-2 border-white group-data-[state=checked]:bg-primary group-data-[state=checked]:border-primary transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-background">
          <Checkbox.Indicator>
            <Check size={20} className="text-white" />
          </Checkbox.Indicator>
        </div>

        <span className="font-semibold text-xl text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
          {title}
        </span>
      </Checkbox.Root>
    </div>
  )
}