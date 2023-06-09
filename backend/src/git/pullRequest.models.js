const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pullRequestSchema = Schema({


    user: {
        type: String,
        required: true,
    },

    title:{
        type: String,
        required: true,
    },

    number:{
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
    },

    merged_by: {
        type: String,
        required: false,
    },

    countOfComments: {
        type: Number,
        required: false,
    },

    countOfReviewComments: {
        type: Number,
        required: false,
    },

    countOfCommits: {
        type: Number,
        required: false,
    },

    countOfLinesAdded: {
        type: Number,
        required: false,
    },

    countOfLinesDeleted: {
        type: Number,
        required: false,
    },

    countOfChangedFiles: {
        type: Number,
        required: false,
    },

    requestedReviewers: {
        type: Object,
        required: false,
    },

    reviewerInformation: {
        type: Object,
        required: false,
    }



});

const PullRequests = mongoose.model("PullRequests", pullRequestSchema)

module.exports =  PullRequests
