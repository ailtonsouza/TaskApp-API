const request = require('supertest');
const Task = require('../src/models/tasks');
const app = require('../src/app.js');
const { userOne, taskTwo, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201);
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})

test('Request all tasks of user one', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
})

test('Test delete task security', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskTwo._id);
  expect(task).not.toBeNull()
})



// outer.delete('/tasks/:id', auth, async (req, res) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
//     if (!task) {
//       return res.status(404).send()
//     }
//     await task.remove();
//     res.send(task);
//   } catch (e) {
//     res.status(500).send()
//   }
// })