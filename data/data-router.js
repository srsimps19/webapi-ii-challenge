const express = require('express');

const Db = require('./db.js')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Db.find(req.query);
        res.status(200).json(posts);
      } catch (e) {
        console.log(e);
        // log error to database
        res
          .status(500)
          .json({ message: `Internal Server Error: cannot retrieve database` });
      }
});