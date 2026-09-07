const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-indigo-600" />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Loading employees...
      </p>
    </div>
  )
}

export default LoadingAnimation