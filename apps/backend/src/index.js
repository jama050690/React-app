import Fastify from "fastify"
import cors from "@fastify/cors"
import { query } from "./utils/pg.js"
import * as Q from "./db/index.js"

const app = Fastify()

await app.register( cors )

app.get( "/books", async ( req ) => {

	let { page = 1, count = 10, category = 0 } = req.query

	page = parseInt( page ) || 1
	count = parseInt( count ) || 10
	category = parseInt( category ) || 0

	const books = await query( Q.BOOKS, category, page, count )

	return books
} )

app.get( "/books/count", async ( req ) => {

	let { category = 0 } = req.query

	category = parseInt( category ) || 0

	const [ result ] = await query( Q.BOOKS_COUNT, category )

	return result || { books: 0 }
} )

app.listen( {
	port: ( process.env.BACKEND_PORT - 0 ) || 3_100,
} )
