require('dotenv').config()
const PullRequests  = require('./pullRequest.models')


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

                        fetch(`https://api.github.com/repos/geolaborapp/geolabor/pulls/${id}`,{
                            method: 'GET',
                            headers: {
                                        'Accept': 'application/vnd.github+json',
                                        'X-GitHub-Api-Version': '2022-11-28',
                                        'Authorization': `Bearer ${encodeURIComponent(process.env.GIT_ACCESS_TOKEN)}`,
                                },
                            })
                            .then(response => response.json())
                            .then(dataPullRequest => {

                                    const user = dataPullRequest.user.login
                                    const title = dataPullRequest.title
                                    const number = dataPullRequest.number
                                    const status = dataPullRequest.state
                                    const created = dataPullRequest.created_at
                                    const merged_by = dataPullRequest.merged_by
                                    const countOfComments = dataPullRequest.comments
                                    const countOfReviewComments = dataPullRequest.review_comments
                                    const countOfCommits = dataPullRequest.commits
                                    const countOfAdditions = dataPullRequest.additions
                                    const countOfDeletions = dataPullRequest.deletions
                                    const countOfChangedFiles = dataPullRequest.changed_files
                                    

                                    const prToSave = {
                                        user,
                                        title, 
                                        number,  
                                        status, 
                                        created,  
                                        merged_by,
                                        countOfComments,
                                        countOfReviewComments,
                                        countOfCommits,
                                        countOfAdditions,
                                        countOfDeletions,
                                        countOfChangedFiles
                                    }
                                   


                                    try {
                                                                       
                                        return PullRequests.updateOne({'number': number}, {$set: prToSave}, { upsert: true})
                                        
                                    } catch (error){
                                        console.log(`Could not update Pull Request in DB: ${error}`)
                                    }
                                }

                            )
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
}