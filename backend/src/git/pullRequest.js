require('dotenv').config()
const { faUserEdit } = require('@fortawesome/free-solid-svg-icons')
const PullRequests  = require('./pullRequest.models')
const { response } = require('express')


module.exports = class PullRequest{


    async updatePullRequestInDb(){
        
        try{
            
            fetch(`https://api.github.com/repos/geolaborapp/geolabor/pulls?state=open&per_page=100`,{
            method: 'GET',
            headers: {
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28',
                        'Authorization': `Bearer ${encodeURIComponent(process.env.GIT_ACCESS_TOKEN)}`,
                },
            })
            .then(response => response.json())
            .then(prInfo =>{
                    prInfo.forEach(prElement => {
                        
                        const id = prElement.number

                        const getPR = fetch(`https://api.github.com/repos/geolaborapp/geolabor/pulls/${id}`,{
                            method: 'GET',
                            headers: {
                                        'Accept': 'application/vnd.github+json',
                                        'X-GitHub-Api-Version': '2022-11-28',
                                        'Authorization': `Bearer ${encodeURIComponent(process.env.GIT_ACCESS_TOKEN)}`,
                                },
                            })
                        
                        const getPrReviewer = fetch(`https://api.github.com/repos/geolaborapp/geolabor/pulls/${id}/reviews`,{
                                method: 'GET',
                                headers: {
                                            'Accept': 'application/vnd.github+json',
                                            'X-GitHub-Api-Version': '2022-11-28',
                                            'Authorization': `Bearer ${encodeURIComponent(process.env.GIT_ACCESS_TOKEN)}`,
                                    },
                        })

                        Promise.all([getPR, getPrReviewer])
                        .then((values) => Promise.all([values[0].json(), values[1].json()]))
                        .then( (res) => {
                           
                            const requestedReviewers = []
                            const reviewerInformation = []

                            res[0].requested_reviewers.forEach(reviewer =>{
                                requestedReviewers.push(reviewer.login)
                            })

                            res[1].forEach( reviewerInfo => {
                                reviewerInformation.push( 
                                    {'revisor': reviewerInfo.user.login, 
                                    'state': reviewerInfo.state,
                                    'submittedAt': reviewerInfo.submitted_at
                                })
                            })
                                

                            const user = res[0].user.login
                            const title = res[0].title
                            const number = res[0].number
                            const state = res[0].state
                            const created = res[0].created_at
                            const merged_by = res[0].merged_by
                            const countOfComments = res[0].comments
                            const countOfReviewComments = res[0].review_comments
                            const countOfCommits = res[0].commits
                            const countOfLinesAdded = res[0].additions
                            const countOfLinesDeleted = res[0].deletions
                            const countOfChangedFiles = res[0].changed_files
                            const status = res[0].draft ?  'draft' : res[0].state
                            
                            const prToSave = {
                                            user,
                                            title, 
                                            number,
                                            state,  
                                            status, 
                                            created,  
                                            merged_by,
                                            countOfComments,
                                            countOfReviewComments,
                                            countOfCommits,
                                            countOfLinesAdded,
                                            countOfLinesDeleted,
                                            countOfChangedFiles,
                                            requestedReviewers,
                                            reviewerInformation
                            }

                            try {
                                return PullRequests.updateOne({'number': number}, {$set: prToSave}, { upsert: true})                
                                } 
                            catch (error){
                                console.log(`Could not update Pull Request in DB: ${error}`)
                            }
                            
                        })
                    }) 
                }
            )

        } catch (error){
            console.log(`Could not update Pull Requests: ${error}`)
        }
    }

    async getPullRequest(){
        await this.updatePullRequestInDb()

        try{
            const prs = await PullRequests.find()
            return prs
        }
        catch(error){
            return `Could not get Pull Requests: ${error}`
        }
    }

    async getPullRequestOfOneUser(username){

        try{
            const prsOfUser = await PullRequests.find({'user': username})
            return prsOfUser
        }
        catch(error){
            return `Could not get Pull Requests of ${username}: ${error}`
        }
    }

    async sumOfPrOpen(prsList){
        try{

            let sumOfPrOpen = 0

            prsList.forEach( pr =>{
                if(pr.status === 'open'){
                    sumOfPrOpen += 1
                }
            })

            return sumOfPrOpen

        }catch(error){
            return `Could not get Sum of Pull Requests: ${error}`
        }
    }

    
    async getUsersWithPullRequests(){
        try {
            
            const prs = await PullRequests.find()
            let users = []

            prs.forEach(pr => {
                if (!users.includes(pr.user)){
                    users.push(pr.user)
                }
            })
           

            return users
            
        }
        catch(error){
            return `Could not get all users with Pull Requests: ${error}`
        }
    }


    
    async getNumberPrEachUser(){
        try {
            
            const users = await this.getUsersWithPullRequests()
            const countOfPrEachUser = []

            for(let user of users){
                try{
                    var insert = {}
                    const listPrUser = await this.getPullRequestOfOneUser(user)
                    const sumOfPr = await this.sumOfPrOpen(listPrUser)
                    insert[user] = sumOfPr
                    countOfPrEachUser.push(insert)

                }
                catch(error){
                    return `Could not get the number of Pull Requests of user: ${error}`
                }
            }
           
            return countOfPrEachUser
            
        }
        catch(error){
            return `Could not get the number of Pull Requests for each user: ${error}`
        }
    }
    
}