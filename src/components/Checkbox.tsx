import { Check, X } from "lucide-react";
import * as CheckBoxRadix from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { FormEvent, useState } from "react";

interface Props {
  id: number;
  title: string;
  isChecked?: boolean;
  onCheckedChange?: () => void;
  isEditable?: boolean;
  setIsEditable?: (value: boolean) => void;
  editTask?: (id: number, taskNewTitle: string) => void;
}

export function Checkbox({ id, title, isChecked, onCheckedChange, isEditable, setIsEditable, editTask }: Props) {
  const [newTitle, setNewTitle] = useState(title);

  function handleCancelEditing() {
    if (setIsEditable) {
      setIsEditable(false);
    }
    setNewTitle(title);
  }

  function handleSubmitEditing(
    event?: FormEvent<HTMLFormElement>,
  ) {
    if (event) {
      event.preventDefault();
    }

    if (!newTitle.trim()) {
      handleCancelEditing();

      return;
    }

    if (editTask) {
      editTask(id, newTitle.trim())
    }

    if (setIsEditable) {
      setIsEditable(false);
    }

    setNewTitle(newTitle.trim())
  }

  return (
    <div className="contents items-center gap-3 group focus:outline-none disabled:cursor-not-allowed">
      <CheckBoxRadix.Root
        onCheckedChange={onCheckedChange}
        checked={isChecked}
        disabled={false}
        className="contents items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      >
        <div className="h-8 w-8 rounded-md flex flex-none items-center justify-center border-2 border-white group-data-[state=checked]:bg-primary group-data-[state=checked]:border-primary transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-background mr-3">
          <CheckBoxRadix.Indicator>
            <Check size={20} className="text-white" />
          </CheckBoxRadix.Indicator>
        </div>

      </CheckBoxRadix.Root>

      {isEditable ? (
        <form className="flex w-full" onSubmit={handleSubmitEditing}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onSubmit={() => handleSubmitEditing}
            autoFocus
            className="font-semibold text-xl text-white whitespace-nowrap overflow-hidden text-ellipsis mr-2 bg-transparent w-full pr-2 border-white border rounded"
          />

          <button type="submit" className='w-8 h-8 flex justify-center items-center mr-1'>
            <Check size={20} className="text-white" />
          </button>

          <button onClick={handleCancelEditing} className='w-8 h-8 flex justify-center items-center mr-4'>
            <X size={20} className="text-white" />
          </button>
        </form>
      ) : (
        <span
          className={clsx("font-semibold text-xl text-white whitespace-nowrap overflow-hidden text-ellipsis mr-2", {
            'line-through text-zinc-400': isChecked,
          })}
        >
          {newTitle}
        </span>
      )}
    </div>
  )
}