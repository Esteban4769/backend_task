import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.update(req.body);
  
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const changeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, pageCount } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (!name || !author || !pageCount) {
      return res.status(400).json({ error: 'title, author and page count are required' });
    }

    await book.update({
      name,
      author,
      pageCount,
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};