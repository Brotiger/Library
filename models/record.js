const { model } = require('mongoose')

module.exports.bookSchema = model('book', {
    name: {
        type: String,
        required: true,
    },
    authors: {
        type: Array
    }
})

module.exports.authorSchema = model('author', {
    name: {
        type: String,
        required: true,
    }
})
