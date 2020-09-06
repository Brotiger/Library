const { Router } = require('express')
const Record = require('./models/record')

const router = Router()

router.get('/', async (req, res) => {
    const books = await Record.bookSchema.find({$where: "this.authors.length >= 3"},{_id: 0}).sort({name: -1}).lean()
    res.render('index', {
        title: "Library",
        books
    })
})

module.exports = router