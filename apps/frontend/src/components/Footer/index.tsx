import { useContext, type ChangeEvent } from "react"
import { LanguageContext } from "../../contexts/LanguageContext"
import { T } from "../../T"
import type { Language } from "../../types"

export function Footer() {

	const [ language, setLanguage ] = useContext( LanguageContext )

	const onChange = ( e: ChangeEvent<HTMLSelectElement> ) => setLanguage( e.target.value as Language )

	return (
		<footer>
			<p>
				&copy; Copyright 2026. { T[ language ].copyright }
			</p>
			<select
				defaultValue={ language }
				onChange={ onChange }
			>
				<option value="uz">O'zbekcha</option>
				<option value="en">English</option>
			</select>
		</footer>
	)
}
