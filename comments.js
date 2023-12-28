// Create web server to handle comments
// 2/23/2018
// *********************************************************************
var express = require('express');
var router = express.Router();
var db = require('../db'); //database module

// GET /comments
// Get all comments
router.get('/', function(req, res) {
    db.getComments(function(err, comments) {
        if (err) {
            res.status(500).send('Error occurred: database error');
        } else {
            res.send(comments);
        }
    });
});

// GET /comments/:id
// Get comment by id
router.get('/:id', function(req, res) {
    db.getComment(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send('Error occurred: database error');
        } else {
            res.send(comment);
        }
    });
});

// POST /comments
// Add a new comment
router.post('/', function(req, res) {
    db.addComment(req.body, function(err, id) {
        if (err) {
            res.status(500).send('Error occurred: database error');
        } else {
            res.send(id.toString());
        }
    });
});

// PUT /comments/:id
// Update a comment
router.put('/:id', function(req, res) {
    db.updateComment(req.params.id, req.body, function(err, result) {
        if (err) {
            res.status(500).send('Error occurred: database error');
        } else if (result === 0) {
            res.status(404).send('Error occurred: comment not found');
        } else {
            res.send('Comment updated');
        }
    });
});

// DELETE /comments/:id
// Delete a comment
router.delete('/:id', function(req, res) {
    db.deleteComment(req.params.id, function(err, result) {
        if (err) {
            res.status(500).send('Error occurred: database error');
        } else if (result === 0) {
            res.status(404).send('Error occurred: comment not found');
        } else {
            res.send('Comment deleted');
        }
    });
});

module.exports = router;