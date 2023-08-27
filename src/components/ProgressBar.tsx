interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full my-4">
      <div
        role="progressbar"
        aria-label="Progress of subtasks"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-primary transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}