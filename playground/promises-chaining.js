require('../src/db/mongoose')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')

// Task.findByIdAndRemove('5de20660bb90da255c21e91c').then(task => {
//     console.log(task)
//     return Task.countDocuments({
//         completed: false
//     }).then(count => console.log('Total incompleted tasks are:', count))
// }).catch(e => console.log(e))





// User.findByIdAndUpdate('5de28a6985a3ff41f4d26193', {
//         age: 1
//     }).then(user => {
//         console.log(user)
//         return User.countDocuments({
//             age: 1
//         })
//     }).then(u => console.log(u))
//     .catch(e => console.log(e))





// const add = (a, b) => {
//     return new Promise((resolve, rejects) => {
//         setTimeout(() => {
//             resolve(a + b)
//             rejects('You did some mistake!')
//         }, 2000);
//     })
// }
// const sub = (a, b) => {
//     return new Promise((resolve, rejects) => {
//         setTimeout(() => {
//             resolve(a - b)
//             rejects('You did some mistake!')
//         }, 2000);
//     })
// }
// add(1, 2).then(sum => {
//     console.log('sum=' + sum)
//     return sub(sum, 1).then(sub => {
//         console.log('difference=' + sub)
//     })
// }).catch(err => console.log(err))

const UpdateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age
    })
    const count = await User.countDocuments({
        age
    })
    return count
}
//UpdateAgeAndCount('5de13bffeb5e53501cd1c371', 25).then(count => console.log(count)).catch(e => console.log(e))
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({
        completed: false
    })
    return count
}
deleteTaskAndCount('5de13d029cb74b2b0814c438').then(c => console.log(c)).catch(e => console.log(e))