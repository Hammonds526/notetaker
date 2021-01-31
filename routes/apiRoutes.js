const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

// ------

router.get('/notes', (req, res) => {
    // const notes = fs.readFile('/db.db.json');
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        res.json(file)
    });
})

// ------

router.post('/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuid.v4();
    console.log("endpoint hit");
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        file.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(file), (err) => {
            if (err) {console.log("oops...it broke")}
        })
    })
    res.send()
});

// ------

router.delete('/notes/:id', (req, res) => {
    const currentID = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        for (let i = 0; i < file.length; i++) {
            if (currentID === file[i].id) {
                file.splice(i, 1)
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(file), (err) => {
            if (err) {console.log("whoops...it broke")}
        })
    })
    res.send()
});

// ------

module.exports = router