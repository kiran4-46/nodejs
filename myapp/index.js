const instance = require('express')
const app = instance()
const {open} = require('sqlite')
const sqlite = require('sqlite3')
let db
const dbpath = (__dirname, 'goodreads.db')

const initializeDbAndServer = async () => {
  try {
    db = await open({filename: dbpath, driver: sqlite.Database})
    app.listen(3000, () => {
      console.log('the server is running at https:/localhost/3000')
    })
  } catch (e) {
    console.log(`the db server is not running properly ${e.message}`)
    process.exit(1)
  }
}
initializeDbAndServer()

app.get('/books/', async (request, response) => {
  const bookquery = `SELECT * FROM book ORDER BY book_id`
  const bookArray = await db.all(bookquery)
  response.send(bookArray)
})
