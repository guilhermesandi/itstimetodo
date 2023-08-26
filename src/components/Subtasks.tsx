import { FormEvent, useState } from 'react'
import { ChevronRight, Network, Trash2, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

import { Checkbox } from './Checkbox'
import { Task, TaskProps } from './TaskItem'

interface Props {
  task: Task;
  addSubtask: (taskId: number, subtask: TaskProps) => void;
  removeSubtask: (taskId: number, subtaskId: number) => void;
  toggleSubtaskDone: (taskId: number, subtaskId: number) => void;
}

export function Subtasks({ task, addSubtask, removeSubtask, toggleSubtaskDone }: Props) {
  const [newSubtask, setNewSubtask] = useState('');

  function handleAddSubtask(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!newSubtask) {
      return;
    }

    const subtask = {
      id: new Date().getTime(),
      title: newSubtask,
    } as TaskProps;

    addSubtask(task.id, subtask);
    setNewSubtask('');
  }

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
          <Dialog.Title className='text-4xl font-mono text-white'>
            {task.title}
          </Dialog.Title>
          <Dialog.Description className="text-white mt-2 mb-5 text-base">
            Update and create subtasks.
          </Dialog.Description>

          <DragDropContext onDragEnd={() => console.log('a')}>
            <Droppable droppableId='listSubtasks'>
              {(provided) => (
                <ul className='flex flex-col gap-2' {...provided.droppableProps} ref={provided.innerRef}>
                  {task.subtasks?.map((subtask, index) => (
                    <Draggable key={subtask.id} draggableId={String(subtask.id)} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          className='bg-gray-300 rounded-md p-4 flex justify-between items-center !top-auto !left-auto'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Checkbox
                            title={subtask.title}
                            isChecked={subtask.isChecked}
                            onCheckedChange={() => toggleSubtaskDone(task.id, subtask.id)}
                          />

                          <button onClick={() => removeSubtask(task.id, subtask.id)} className='w-8 h-8 flex justify-center items-center'>
                            <Trash2 size={20} className="text-white" />
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          <form className='flex rounded-md overflow-hidden mt-2' onSubmit={handleAddSubtask}>
            <input
              value={newSubtask}
              onChange={e => setNewSubtask(e.target.value)}
              placeholder="Write your subtask here..."
              className='flex flex-1 p-4'
            />
            <button type="submit" className='bg-primary flex justify-center items-center px-6 text-lg font-semibold text-white'>
              <ChevronRight />
            </button>
          </form>

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