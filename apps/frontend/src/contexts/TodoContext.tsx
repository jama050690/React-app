import { createContext, type Dispatch, type SetStateAction } from "react"
import type { Todo } from "../types"

type TodoContextValue = [ Todo[], Dispatch<SetStateAction<Todo[]>> ]

const noopSetTodos: Dispatch<SetStateAction<Todo[]>> = () => undefined

export const TodoContext = createContext<TodoContextValue>( [ [], noopSetTodos ] )
