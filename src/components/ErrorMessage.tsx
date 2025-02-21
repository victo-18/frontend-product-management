import { PropsWithChildren } from "react"

export const ErrorMessage = ({children}: PropsWithChildren ) => {
  return (
    <div className="bg-red-600 p-2 font-medium text-white text-center rounded-lg my-4">{children}</div>
  )
}
