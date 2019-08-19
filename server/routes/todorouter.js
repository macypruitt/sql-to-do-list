const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todolist";`;
    pool.query(queryText).then((result) => {
        console.log(`In /todo GET`, result);
        res.send(result.rows); 
    }).catch((error) => {
        console.log(`Error in GET /artists ${error}`);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const newToDo = req.body;
    const queryText = `INSERT INTO "todolist" ("task", "status")
                       VALUES ($1, $2);`;
    pool.query(queryText, [newToDo.task, newToDo.status])
        .then((responseFromDatabase) => {
            console.log(responseFromDatabase);
           
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`Error in POST /todo ${error}`);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = `UPDATE "todolist" SET "status"='completed' WHERE id=$1;`;

    pool.query(queryText, [taskId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating database: ', err);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {

    const queryText = `DELETE FROM "todolist" WHERE id=$1`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting: ', err);
            res.sendStatus(500);
        });
})

module.exports = router;