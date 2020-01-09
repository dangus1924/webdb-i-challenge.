const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await db.select('*').from('accounts'))
    } catch (err){
        next(err)
    }

})
