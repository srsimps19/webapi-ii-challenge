const express = require('express');

const Db = require('./db.js')

const router = express.Router();

router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Db  
            .insert(newPost)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const newPost = req.body;
    if(!newPost.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Db  
        .insertComment(req.body)
        .then(post => {
            if(!id) {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
            } else {
                res.status(201).json(post)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            });
        });
    }
})

router.get('/', (req, res) => {
    Db
        .find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Db
        .findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    Db
        .findPostComments(id)
        .then(post => {
            if(!post){
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Db
        .remove(id)
        .then(post => {
            if (!post) {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
            } else {
                res.sendStatus(204);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" });
        });
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body
    if (!changes.title || !changes.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Db
            .update(id, changes)
            .then(post => {
                if (!post) {
                    res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
                } else {
                res.status(200).json(post)
                }
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be modified." });
            });
    };
});

module.exports = router;