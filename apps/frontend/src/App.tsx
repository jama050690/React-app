import "./App.css"
import { useEffect, useState, type CSSProperties, type ChangeEvent } from "react"
import type { Book, BooksCountResponse } from "./types"

const API_BASE_URL = "http://localhost:3100"

const CATEGORY_OPTIONS = [
	{ value: "0", label: "All shelves", description: "Every category stacked in one view." },
	{ value: "1", label: "Fiction", description: "Stories with sharp characters and big moods." },
	{ value: "2", label: "Science", description: "Ideas, experiments, and curious thinking." },
	{ value: "3", label: "History", description: "Timelines, turning points, and context." },
	{ value: "4", label: "Technology", description: "Tools, systems, and technical craft." },
	{ value: "5", label: "Philosophy", description: "Questions worth keeping open a little longer." },
	{ value: "6", label: "Business", description: "Strategy, leverage, and practical execution." },
	{ value: "7", label: "Fantasy", description: "Myth, magic, and world-building." },
	{ value: "8", label: "Mystery", description: "Puzzles, clues, and quiet tension." },
	{ value: "9", label: "Romance", description: "Warmth, chemistry, and emotional pull." },
	{ value: "10", label: "Biography", description: "Lives that changed the room around them." },
]

const PAGE_SIZE_OPTIONS = [ "4", "8", "12" ]
const CARD_ACCENTS = [ "#d57a3d", "#4cb7a5", "#d9b44a", "#6e8df2", "#dc6b7d", "#79b15d" ]

type PaginationProps = {
	countOfPages: number
	currentPage: number
	onChange: ( page: number ) => void
}

type BookCardProps = {
	book: Book
}

function clampPage( page: number, countOfPages: number ) {

	if ( countOfPages < 1 ) {

		return 1
	}

	return Math.min( Math.max( page, 1 ), countOfPages )
}

async function getCounts( category: string, signal: AbortSignal ): Promise<BooksCountResponse> {

	const query = new URLSearchParams( { category } )
	const response = await fetch( `${ API_BASE_URL }/books/count?${ query.toString() }`, { signal } )

	if ( !response.ok ) {

		throw new Error( "Could not load the catalog totals." )
	}

	return response.json() as Promise<BooksCountResponse>
}

async function getBooks(
	{
		category,
		count,
		page,
		signal,
	}: {
		category: string
		count: number
		page: number
		signal: AbortSignal
	},
) {

	const query = new URLSearchParams( {
		category,
		count: String( count ),
		page: String( page ),
	} )
	const response = await fetch( `${ API_BASE_URL }/books?${ query.toString() }`, { signal } )

	if ( !response.ok ) {

		throw new Error( "Could not load the book list." )
	}

	return response.json() as Promise<Book[]>
}

function formatPrice( value: string ) {

	return new Intl.NumberFormat( "en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	} ).format( Number( value ) )
}

function getBookAccent( categoryId: number ) {

	return CARD_ACCENTS[ ( categoryId - 1 + CARD_ACCENTS.length ) % CARD_ACCENTS.length ] || CARD_ACCENTS[ 0 ]
}

function getBookInitials( name: string ) {

	return name
		.split( /\s+/ )
		.slice( 0, 2 )
		.map( word => word[ 0 ]?.toUpperCase() || "" )
		.join( "" )
}

function Pagination( { countOfPages, currentPage, onChange }: PaginationProps ) {

	if ( countOfPages <= 1 ) {

		return null
	}

	const visiblePagesCount = Math.min( countOfPages, 5 )
	const startPage = Math.max(
		1,
		Math.min( currentPage - 2, countOfPages - visiblePagesCount + 1 ),
	)
	const pages = new Array( visiblePagesCount )
		.fill( 0 )
		.map( ( _, index ) => startPage + index )

	return (
		<nav className="pagination" aria-label="Pagination">
			<p className="pagination__summary">
				Page <strong>{ currentPage }</strong> of <strong>{ countOfPages }</strong>
			</p>

			<ul className="pagination__group">
				<li>
					<button
						className="pagination__button"
						disabled={ currentPage <= 1 }
						onClick={ () => onChange( currentPage - 1 ) }
					>
						Previous
					</button>
				</li>

				{
					pages.map( pageNumber => (
						<li key={ pageNumber }>
							<button
								className={ `pagination__button${ pageNumber === currentPage ? " current" : "" }` }
								onClick={ () => onChange( pageNumber ) }
							>
								{ pageNumber }
							</button>
						</li>
					) )
				}

				<li>
					<button
						className="pagination__button"
						disabled={ currentPage >= countOfPages }
						onClick={ () => onChange( currentPage + 1 ) }
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	)
}

function BookCard( { book }: BookCardProps ) {

	const cardStyle = {
		"--card-accent": getBookAccent( book.category_id ),
	} as CSSProperties

	return (
		<li className="book-card" style={ cardStyle }>
			<div className="book-card__cover">
				<div className="book-card__cover-top">
					<span className="book-card__badge">{ book.category_name }</span>
					<span className="book-card__index">#{ String( book.id ).padStart( 2, "0" ) }</span>
				</div>

				<div className="book-card__cover-bottom">
					<p className="book-card__caption">Shelf pick</p>
					<p className="book-card__initials">{ getBookInitials( book.name ) }</p>
				</div>
			</div>

			<div className="book-card__body">
				<div className="book-card__copy">
					<p className="book-card__author">{ book.author }</p>
					<h3 className="book-card__title">{ book.name }</h3>
				</div>

				<div className="book-card__meta">
					<span className="book-card__chip">Category { book.category_id }</span>
					<strong className="book-card__price">{ formatPrice( book.price ) }</strong>
				</div>
			</div>
		</li>
	)
}

export function App() {

	const [ category, setCategory ] = useState( "0" )
	const [ count, setCount ] = useState( "8" )
	const [ page, setPage ] = useState( 1 )
	const [ totalBooks, setTotalBooks ] = useState( 0 )
	const [ books, setBooks ] = useState<Book[]>( [] )
	const [ isLoading, setIsLoading ] = useState( true )
	const [ error, setError ] = useState( "" )
	const [ refreshKey, setRefreshKey ] = useState( 0 )

	const countNumber = Number( count )
	const countOfPages = totalBooks > 0 ? Math.ceil( totalBooks / countNumber ) : 0
	const activeCategory = CATEGORY_OPTIONS.find( option => option.value === category ) || CATEGORY_OPTIONS[ 0 ]
	const rangeStart = totalBooks === 0 ? 0 : ( page - 1 ) * countNumber + 1
	const rangeEnd = totalBooks === 0 ? 0 : Math.min( page * countNumber, totalBooks )
	const pageLabel = countOfPages === 0 ? "1 / 1" : `${ page } / ${ countOfPages }`

	useEffect( () => {

		const controller = new AbortController()

		const loadCatalog = async () => {

			setIsLoading( true )
			setError( "" )

			try {

				const [ counts, nextBooks ] = await Promise.all( [
					getCounts( category, controller.signal ),
					getBooks( {
						category,
						count: countNumber,
						page,
						signal: controller.signal,
					} ),
				] )
				const nextCountOfPages = counts.books > 0 ? Math.ceil( counts.books / countNumber ) : 0

				setTotalBooks( counts.books )

				if ( nextCountOfPages > 0 && page > nextCountOfPages ) {

					setPage( nextCountOfPages )

					return
				}

				if ( nextCountOfPages === 0 && page !== 1 ) {

					setPage( 1 )

					return
				}

				setBooks( nextBooks )
			}
			catch ( error_ ) {

				if ( controller.signal.aborted ) {

					return
				}

				setBooks( [] )
				setTotalBooks( 0 )
				setError(
					error_ instanceof Error
						? error_.message
						: "Could not load the catalog right now.",
				)
			}
			finally {

				if ( !controller.signal.aborted ) {

					setIsLoading( false )
				}
			}
		}

		void loadCatalog()

		return () => controller.abort()
	}, [ category, countNumber, page, refreshKey ] )

	return (
		<div id="app">
			<section className="hero">
				<div className="hero__copy">
					<p className="hero__eyebrow">React Book Catalog</p>
					<h1>Build a shelf that actually feels curated.</h1>
					<p className="hero__text">
						Browse by category, switch the density, and move through the collection
						with a calmer layout that feels more like a real catalog.
					</p>
				</div>

				<div className="hero__panel">
					<p className="hero__panel-label">Current lens</p>
					<h2>{ activeCategory.label }</h2>
					<p className="hero__panel-text">{ activeCategory.description }</p>

					<div className="hero__stats">
						<div className="stat">
							<span className="stat__label">Titles</span>
							<strong className="stat__value">{ totalBooks }</strong>
						</div>

						<div className="stat">
							<span className="stat__label">Page size</span>
							<strong className="stat__value">{ count }</strong>
						</div>

						<div className="stat">
							<span className="stat__label">Page</span>
							<strong className="stat__value">{ pageLabel }</strong>
						</div>
					</div>
				</div>
			</section>

			<section className="toolbar">
				<div className="field">
					<label htmlFor="category">Category</label>
					<select
						id="category"
						value={ category }
						onChange={ ( evt: ChangeEvent<HTMLSelectElement> ) => {

							setCategory( evt.target.value )
							setPage( 1 )
						} }
					>
						{
							CATEGORY_OPTIONS.map( option => (
								<option key={ option.value } value={ option.value }>
									{ option.label }
								</option>
							) )
						}
					</select>
				</div>

				<div className="field">
					<label htmlFor="page-size">Cards per page</label>
					<select
						id="page-size"
						value={ count }
						onChange={ ( evt: ChangeEvent<HTMLSelectElement> ) => {

							setCount( evt.target.value )
							setPage( 1 )
						} }
					>
						{
							PAGE_SIZE_OPTIONS.map( option => (
								<option key={ option } value={ option }>
									{ option }
								</option>
							) )
						}
					</select>
				</div>

				<div className="toolbar__summary">
					<span className="toolbar__summary-label">Catalog status</span>
					<strong className="toolbar__summary-value">
						{
							totalBooks === 0
								? "No titles matched this filter."
								: `Showing ${ rangeStart }-${ rangeEnd } of ${ totalBooks } titles`
						}
					</strong>
				</div>
			</section>

			<section className="catalog">
				<div className="catalog__top">
					<div>
						<p className="catalog__eyebrow">Shelf view</p>
						<h2>Books ready to browse</h2>
					</div>

					<button
						className="catalog__refresh"
						disabled={ isLoading }
						onClick={ () => setRefreshKey( value => value + 1 ) }
					>
						Refresh
					</button>
				</div>

				{
					error && (
						<div className="state state--error">
							<h3>Catalog temporarily unavailable</h3>
							<p>{ error }</p>
							<button className="state__action" onClick={ () => setRefreshKey( value => value + 1 ) }>
								Try again
							</button>
						</div>
					)
				}

				{
					!error && isLoading && (
						<ul className="loading-grid" aria-label="Loading books">
							{
								new Array( Math.min( countNumber, 6 ) ).fill( 0 ).map( ( _, index ) => (
									<li className="skeleton-card" key={ index }></li>
								) )
							}
						</ul>
					)
				}

				{
					!error && !isLoading && books.length > 0 && (
						<ul className="books">
							{
								books.map( book => (
									<BookCard book={ book } key={ book.id } />
								) )
							}
						</ul>
					)
				}

				{
					!error && !isLoading && books.length === 0 && (
						<div className="state">
							<h3>No books found</h3>
							<p>Try switching the category or widening the shelf.</p>
						</div>
					)
				}

				<Pagination
					countOfPages={ countOfPages }
					currentPage={ page }
					onChange={ nextPage => setPage( clampPage( nextPage, countOfPages ) ) }
				/>
			</section>
		</div>
	)
}
