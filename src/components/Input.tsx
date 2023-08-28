import { InputHTMLAttributes } from 'react';
import { ChevronRight } from "lucide-react";

export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex rounded-md overflow-hidden'>
      <input
        className='flex flex-1 p-4'
        {...rest}
      />
      <button type="submit" className='bg-primary flex justify-center items-center px-6 text-lg font-semibold text-white transition-colors hover:bg-primary-hover'>
        <ChevronRight />
      </button>
    </div>
  )
}