import { Check, Network, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Checkbox } from './Checkbox'

export function Subtasks() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='w-8 h-8 flex justify-center items-center'>
          <Network size={20} className="text-white" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-opacity data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-white m-0 text-[17px] font-medium">
            Subtasks
          </Dialog.Title>
          <Dialog.Description className="text-white mt-[10px] mb-5 text-[15px] leading-normal">
            Update and create subtasks.
          </Dialog.Description>

          <ul className='flex flex-col gap-2'>
            <li className='bg-gray-300 rounded-md p-4 flex justify-between items-center'>
              <Checkbox title='Subtask' />
            </li>
            <li className='bg-gray-300 rounded-md p-4 flex justify-between items-center'>
              <Checkbox title='Subtask' />
            </li>
            <li className='bg-gray-300 rounded-md p-4 flex justify-between items-center'>
              <Checkbox title='Subtask' />
            </li>
          </ul>

          <Dialog.Close asChild>
            <button
              className="text-white hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}