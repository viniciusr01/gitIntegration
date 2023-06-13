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

router.get('/consolidado', async (req, res) => {
    

    allPr = await pr.getPullRequest()
    sumAllPR = await pr.sumOfPrOpen(allPr)
    numbPrEachUser = await pr.getNumberPrEachUser()

    send = {prEachUser: numbPrEachUser, sum: sumAllPR}


    res.status(200).json(send)
})

router.get('/:username', async (req, res) => {
    const user = req.params.username
    prOneUser = await pr.getPullRequestOfOneUser(user)
    sumPr = await pr.sumOfPrOpen(prOneUser)

    send = {pr: prOneUser, sum: sumPr}

    res.status(200).json(send)
})





module.exports = router;