const { db} = require('.')
const {cheeseData, boardData, userData} = require('./seedData');
const {User, Cheese, Board} = require('../models')

let populateDataBase = async () => {
      await db.sync({ force: true });
      await Promise.all(userData.map((c) => {User.create(c)}))
      await Promise.all(cheeseData.map((c) => {Cheese.create(c)}))
      await Promise.all(boardData.map((c) => {Board.create(c)}))
  };
  
  let buildDB = async () => {
        await populateDataBase()
  }

  module.exports = {buildDB}