/*
* @Author: Pan
* @Date:   2016-03-15 13:11:39
* @Last Modified by:   Pan
* @Last Modified time: 2016-03-15 13:12:24
*/

import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
})

export default router