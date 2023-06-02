const router = require('express').Router()
const PullRequest = require('../git/pullRequest');

pr = new PullRequest()

router.get('/', async (req, res) => {
    send = await pr.getPullRequest()
    res.status(200).json(send)
})


router.get('/sum', async (req, res) => {

    allPr = await pr.getPullRequest()
    send = await pr.sumOfPrOpen(allPr)
    res.status(200).json(send)
})


router.get('/users', async (req, res) => {
    
    send = await pr.getUsersWithPullRequests()
    res.status(200).json(send)
})


router.get('/:username', async (req, res) => {
    const user = req.params.username
    send = await pr.getPullRequestOfOneUser(user)
    res.status(200).json(send)
})


module.exports = router;