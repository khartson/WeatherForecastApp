import type { ValidationError } from "../types/Errors"

interface ErrorDisplayProps {
    error: ValidationError;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
    console.log(error)
    return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline ml-2">{error.title}</span>
      <ul className="list-disc list-inside mt-2">
        {/* {errors.map((error, index) => (
          <li key={index} className="text-sm">
            {error}
          </li>
        ))} */}
        {
            Object.entries(error.errors).map(([field, messages]) =>
            <li key={field} className="text-sm"><span className="font-bold">{field}: </span>{messages.join('; ')}</li>)
        }
      </ul>
    </div>
    )
}