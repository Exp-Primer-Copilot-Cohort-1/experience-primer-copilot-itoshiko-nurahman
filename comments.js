// Create web server to handle comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import models
const Comments = require('../models/comments');

// Create router object
const commentRouter = express.Router();

// Use body-parser
commentRouter.use(bodyParser.json());

// Create routes
commentRouter.route('/')
    // Get all comments
    .get((req, res, next) => {
        Comments.find({})
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new comment
    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created: ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Put method not supported
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    // Delete all comments
    .delete((req, res, next) => {
        Comments.deleteMany({})
            .then((response) => {
                console.log('All comments deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

commentRouter.route('/:commentId')
    // Get comment with specific ID
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post method not supported
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /comments/${req.params.commentId}`);
    })
    // Put comment with specific ID
    .put((req,