const express = require('express');

const postRouter = require('./data/data-router.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Web API II</h>
    `);
});

server.listen(4000, () => {
    console.log("\n ** I'm listening ** \n");
});