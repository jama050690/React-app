export type Language = "en" | "uz"

export type Todo = {
	id: number
	name: string
}

export type Book = {
	id: number
	name: string
	price: string
	category_id: number
	cover_url: string
	author: string
	category_name: string
}

export type BooksCountResponse = {
	books: number
}
