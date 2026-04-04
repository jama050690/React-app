import { useContext } from "react"
import { TodoContext } from "../../contexts/TodoContext"
import { LanguageContext } from "../../contexts/LanguageContext"
import { T } from "../../T"

export function Main() {

	const [ todos ] = useContext( TodoContext )
	const [ language ] = useContext( LanguageContext )

	return (
		<main>
			<h1>{ T[ language ].promotionText( 10 ) }</h1>
			<ul>
				{
					todos.map( todo => (
						<li key={ todo.id }>
							<p>
								<span>{ todo.name }</span>
							</p>
						</li>
					) )
				}
			</ul>
		</main>
	)
}
