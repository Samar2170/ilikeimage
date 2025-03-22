export default function CenteredButton({onClick, title}: {onClick: () => void, title:string}) {
    return (
        <div className="flex justify-center gap-x-6">
        <div className="mt-6 flex items-center justify-end gap-x-6">
        
          <button
            onClick={(e) => {onClick()}}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          {title}
          </button>
        </div>
        </div>

    )
    }