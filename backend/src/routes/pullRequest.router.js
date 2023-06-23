const router = require('express').Router()
const PullRequest = require('../git/pullRequest');

pr = new PullRequest()

router.get('/', async (req, res) => {
    send = await pr.getPullRequest()
    res.status(200).json(send)
})


router.get('/sum', async (req, res) => {

    allPr = await pr.getPullRequest()
    send = await pr.sumOfPr(allPr, 'open')
    res.status(200).json(send)
})


router.get('/users', async (req, res) => {
    
    send = await pr.getListOfUsersWithPullRequest()
    res.status(200).json(send)
})

router.get('/consolidado', async (req, res) => {
    

    allPr = await pr.getPullRequest()
    sumPrOpen = await pr.sumOfPr(allPr, 'open')
    sumPrClosed = await pr.sumOfPr(allPr, 'closed')
    sumPrDraft = await pr.sumOfPr(allPr, 'draft')
    consolodidadoEachUser = await pr.consolodidadoEachUser()

    send = {prEachUser: consolodidadoEachUser, sumOpen: sumPrOpen, sumClosed: sumPrClosed, sumDraft: sumPrDraft}


    res.status(200).json(send)
})

router.get('/:username', async (req, res) => {
    const user = req.params.username
    prOneUser = await pr.getPullRequestOfOneUser(user)
    sumPr = await pr.sumOfPr(prOneUser, 'open')

    send = {pr: prOneUser, sum: sumPr}

    res.status(200).json(send)
})





module.exports = router;