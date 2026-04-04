import { createContext, type Dispatch, type SetStateAction } from "react"
import type { Language } from "../types"

type LanguageContextValue = [ Language, Dispatch<SetStateAction<Language>> ]

const noopSetLanguage: Dispatch<SetStateAction<Language>> = () => undefined

export const LanguageContext = createContext<LanguageContextValue>( [ "en", noopSetLanguage ] )
