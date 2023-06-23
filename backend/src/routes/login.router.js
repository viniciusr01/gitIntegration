
const router = require('express').Router()


router.get('/', async (req, res) => {
    send = 'Rota de Login'
    res.status(200).json(send)
})


module.exports = router;