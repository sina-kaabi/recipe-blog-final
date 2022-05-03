const express = require('express')
const router = express.Router()


//Getting all
router.get('/', (req, res) => {
    res.send('Hello World')

})

//Getting One
router.get('/:id', (req, res) => {
    res.send(req.params.id)

})

// Creating One

router.post('/', (req, res) => {

})

//Updating One



//Deleting One

router.delete('/:id', (req, res) => {

})


module.exports = router