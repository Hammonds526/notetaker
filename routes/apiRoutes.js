const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

// Posts info from the database file to the HTML
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbFile = JSON.parse(data);
        res.json(dbFile)
    });
})

// Posts changes from the HTML to the database file
router.post('/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuid.v4();
    console.log("endpoint hit");
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbFile = JSON.parse(data);
        dbFile.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(dbFile), (err) => {
            if (err) {console.log("oops...it broke")}
        })
    })
    res.send()
});

// Function to delete a previously submitted note
// Reads the database file, parses the data, for loop deletes note with corresponding id
router.delete('/notes/:id', (req, res) => {
    const currentID = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbFile = JSON.parse(data);
        for (let i = 0; i < dbFile.length; i++) {
            if (currentID === dbFile[i].id) {
                dbFile.splice(i, 1)
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(dbFile), (err) => {
            if (err) {console.log("whoops...it broke")}
        })
    })
    res.send()
});

// ------

module.exports = router