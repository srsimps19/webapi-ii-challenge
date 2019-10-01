const express = require('express');

const Db = require('./db.js')

const router = express.Router();

router.get('/', (req, res) => {
    Db
        .find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        });
});