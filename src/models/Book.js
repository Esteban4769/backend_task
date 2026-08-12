import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pageCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Book;