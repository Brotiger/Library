const { Router } = require('express')
const record = require('../models/record')

const router = Router()

router.get('/', async (req, res) => {
    const books = await record.bookSchema.find({$where: "this.authors.length >= 3"},{_id: 0}).sort({name: -1}).lean()
    res.render('index', {
        title: "Главная",
        books
    })
})

module.exports = router