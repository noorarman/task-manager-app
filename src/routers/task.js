const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()


// endpoints for getting task(s)
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/task/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.send(task)
    } catch (error) {
        res.status(404).send('task with such id does not exist!')
    }
})
router.post('/task', async (req, res) => {
    const task = await new Task(req.body)
    try {
        task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send()
    }

})

router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidProperty = updates.every(update => allowedUpdates.includes(update))
    if (!isValidProperty) {
        res.status(404).send({
            error: 'invalid upates'
        })
    }
    try {
        const task = await Task.findById(req.params.id)
        updates.forEach(update => {
            task[update] = req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        } else
            res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router