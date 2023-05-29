const router = require('express').Router()
const PullRequest = require('../git/pullRequest');

pr = new PullRequest()

router.get('/', async (req, res) => {

    send = await pr.getPullRequest()
    res.status(200).json(send)
})

module.exports = router;