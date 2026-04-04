-- CLEAN START (ixtiyoriy, lekin tavsiya qilaman)
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS categories;

-- AUTHORS
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50)
);

-- CATEGORIES
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

-- BOOKS
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	author_id INT REFERENCES authors(id),
	category_id INT REFERENCES categories(id),
	price NUMERIC(10,2),
	cover_url TEXT
);

-- AUTHORS INSERT (10 ta)
INSERT INTO authors (first_name, last_name) VALUES
('Ali', 'Valiyev'),
('Bekzod', 'Karimov'),
('Sardor', 'Aliyev'),
('Jasur', 'Toshmatov'),
('Dilshod', 'Rasulov'),
('Aziza', 'Nazarova'),
('Malika', 'Ismoilova'),
('Javohir', 'Qodirov'),
('Zarina', 'Yusupova'),
('Akmal', 'Sobirov');

-- CATEGORIES INSERT (10 ta)
INSERT INTO categories (name) VALUES
('Fiction'),
('Science'),
('History'),
('Technology'),
('Philosophy'),
('Business'),
('Fantasy'),
('Mystery'),
('Romance'),
('Biography');

-- BOOKS INSERT (50 ta)
INSERT INTO books (name, author_id, category_id, price, cover_url) VALUES
('To Kill a Mockingbird', 1, 1, 25.99, 'https://example.com/tokillamockingbird.jpg'),
('1984', 2, 1, 19.99, 'https://example.com/1984.jpg'),
('The Great Gatsby', 3, 1, 15.50, 'https://example.com/gatsby.jpg'),
('Moby Dick', 4, 1, 18.75, 'https://example.com/mobydick.jpg'),
('War and Peace', 5, 3, 30.00, 'https://example.com/warpeace.jpg'),
('Pride and Prejudice', 6, 1, 22.40, 'https://example.com/pride.jpg'),
('The Hobbit', 7, 7, 27.90, 'https://example.com/hobbit.jpg'),
('Harry Potter and the Sorcerer''s Stone', 8, 7, 29.99, 'https://example.com/hp1.jpg'),
('The Lord of the Rings', 9, 7, 35.00, 'https://example.com/lotr.jpg'),
('The Catcher in the Rye', 10, 1, 20.00, 'https://example.com/catcher.jpg'),

('The Alchemist', 1, 1, 18.00, 'https://example.com/alchemist.jpg'),
('Brave New World', 2, 1, 21.00, 'https://example.com/brave.jpg'),
('Crime and Punishment', 3, 3, 26.00, 'https://example.com/crime.jpg'),
('The Brothers Karamazov', 4, 3, 28.00, 'https://example.com/karamazov.jpg'),
('Anna Karenina', 5, 3, 24.00, 'https://example.com/anna.jpg'),
('The Da Vinci Code', 6, 1, 23.00, 'https://example.com/davinci.jpg'),
('Angels and Demons', 7, 1, 22.00, 'https://example.com/angels.jpg'),
('Digital Fortress', 8, 10, 19.00, 'https://example.com/digital.jpg'),
('Clean Code', 9, 10, 32.00, 'https://example.com/cleancode.jpg'),
('The Pragmatic Programmer', 10, 10, 34.00, 'https://example.com/pragmatic.jpg'),

('Atomic Habits', 1, 5, 21.99, 'https://example.com/atomic.jpg'),
('Deep Work', 2, 5, 23.99, 'https://example.com/deepwork.jpg'),
('Rich Dad Poor Dad', 3, 5, 20.99, 'https://example.com/richdad.jpg'),
('Think and Grow Rich', 4, 5, 19.99, 'https://example.com/think.jpg'),
('Start With Why', 5, 5, 22.99, 'https://example.com/startwhy.jpg'),

('Sapiens', 6, 2, 26.99, 'https://example.com/sapiens.jpg'),
('Homo Deus', 7, 2, 27.99, 'https://example.com/homodeus.jpg'),
('Educated', 8, 8, 24.99, 'https://example.com/educated.jpg'),
('Becoming', 9, 8, 25.99, 'https://example.com/becoming.jpg'),
('Steve Jobs', 10, 8, 29.99, 'https://example.com/jobs.jpg'),

('The Lean Startup', 1, 5, 23.00, 'https://example.com/lean.jpg'),
('Zero to One', 2, 5, 22.00, 'https://example.com/zero.jpg'),
('Hooked', 3, 5, 21.00, 'https://example.com/hooked.jpg'),
('Rework', 4, 5, 20.00, 'https://example.com/rework.jpg'),

('Introduction to Algorithms', 5, 10, 40.00, 'https://example.com/algorithms.jpg'),
('Design Patterns', 6, 10, 38.00, 'https://example.com/designpatterns.jpg'),
('Refactoring', 7, 10, 36.00, 'https://example.com/refactoring.jpg'),
('You Dont Know JS', 8, 10, 28.00, 'https://example.com/ydkjs.jpg'),
('JavaScript: The Good Parts', 9, 10, 26.00, 'https://example.com/jsgood.jpg'),

('Dune', 10, 7, 29.00, 'https://example.com/dune.jpg'),
('Foundation', 1, 7, 27.00, 'https://example.com/foundation.jpg'),
('Enders Game', 2, 7, 25.00, 'https://example.com/ender.jpg'),
('The Martian', 3, 7, 24.00, 'https://example.com/martian.jpg'),

('The Power of Habit', 4, 5, 22.00, 'https://example.com/habit.jpg'),
('Outliers', 5, 5, 21.00, 'https://example.com/outliers.jpg'),
('Blink', 6, 5, 20.00, 'https://example.com/blink.jpg'),
('Grit', 7, 5, 19.00, 'https://example.com/grit.jpg'),

('Thinking, Fast and Slow', 8, 5, 23.00, 'https://example.com/thinking.jpg'),
('Mans Search for Meaning', 9, 8, 18.00, 'https://example.com/meaning.jpg'),
('The 7 Habits of Highly Effective People', 10, 5, 24.00, 'https://example.com/7habits.jpg');

-- QUERIES

select
	b.id,
	b.name,
	b.price,
	b.cover_url,
	a.first_name || ' ' || a.first_name author,
	c.name catrgory_name
from books b
join authors a on a.id = b.author_id
join categories c on c.id = b.category_id
where
	b.category_id > 0 AND
	b.category_id < ( select max( id ) + 1 from categories )
offset 0 limit 10
;

select
	b.id,
	b.name,
	b.price,
	b.category_id,
	b.cover_url,
	a.first_name || ' ' || a.first_name author,
	c.name catrgory_name
from books b
join authors a on a.id = b.author_id
join categories c on c.id = b.category_id
where
	b.category_id > (
		case
			when 0 > 0 then 0 - 1
			else 0 
		end
	) AND
	b.category_id < (
		case
			when 0 > 0 then 0 + 1
			else ( select max( id ) + 1 from categories )
		end
	)
;

offset 0 limit 10


	CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50)
);

-- CATEGORIES
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

-- BOOKS
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	author_id INT REFERENCES authors(id),
	category_id INT REFERENCES categories(id),
	price NUMERIC(10,2),
	cover_url TEXT
);

select

	case

		when true then 1
		when false then 0

	end

