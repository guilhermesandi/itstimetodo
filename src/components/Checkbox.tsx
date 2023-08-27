import { Check } from "lucide-react";
import * as CheckBoxRadix from "@radix-ui/react-checkbox";
import clsx from "clsx";

interface Props {
  title: string;
  isChecked?: boolean;
  onCheckedChange?: () => void;
}

export function Checkbox({ title, isChecked, onCheckedChange }: Props) {
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

      <span className={clsx("font-semibold text-xl text-white whitespace-nowrap overflow-hidden text-ellipsis mr-2", {
        'line-through text-zinc-400' : isChecked,
      })}>
        {title}
      </span>
    </div>
  )
}