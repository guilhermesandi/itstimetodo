import { Check } from "lucide-react";
import * as CheckBoxRadix from "@radix-ui/react-checkbox";

interface Props {
  title: string;
  isChecked?: boolean;
  onCheckedChange?: () => void;
}

export function Checkbox({ title, isChecked, onCheckedChange }: Props) {
  return (
    <CheckBoxRadix.Root
      onCheckedChange={onCheckedChange}
      checked={isChecked}
      disabled={false}
      className="flex flex-1 items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
    >
      <div className="h-8 w-8 rounded-md flex items-center justify-center border-2 border-white group-data-[state=checked]:bg-primary group-data-[state=checked]:border-primary transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-background">
        <CheckBoxRadix.Indicator>
          <Check size={20} className="text-white" />
        </CheckBoxRadix.Indicator>
      </div>

      <span className="font-semibold text-xl text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </span>
    </CheckBoxRadix.Root>
  )
}