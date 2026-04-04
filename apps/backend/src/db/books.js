const CATEGORY_FILTER = `
where
	( $1 = 0 or b.category_id = $1 )
`

export const BOOKS = `
select
	b.id,
	b.name,
	b.price,
	b.category_id,
	b.cover_url,
	a.first_name || ' ' || a.last_name author,
	c.name category_name
from books b
join authors a on a.id = b.author_id
join categories c on c.id = b.category_id
${ CATEGORY_FILTER }
order by b.id
offset ( $2 - 1 ) * $3 limit $3
;
`

export const BOOKS_COUNT = `
select
	count( * )::int books
from books b
${ CATEGORY_FILTER }
;
`
