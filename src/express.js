const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express()
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//--------------------------------------------------------------------------
// Sample data
//let tasks = [
//  { id: 1, name: 'Task 1', completed: false },
//  { id: 2, name: 'Task 2', completed: true },
//];

//Route to get all tasks
//app.get('/tasks', (req, res) => {
 // console.log('Received GET request for /tasks');
 // res.json(tasks);
//});

// Route to add a new task
//app.post('/tasks', (req, res) => {
 // const { name } = req.body;
  //const newTask = { id: tasks.length + 1, name, completed: false };
  //tasks.push(newTask);
 // res.json(newTask);
//});

// Route to mark a task as complete
//app.put('/tasks/:id/complete', (req, res) => {
 // const taskId = parseInt(req.params.id);
  //const task = tasks.find(t => t.id === taskId);

  //if (task) {
    //task.completed = true;
    //res.json(task);
  //} else {
    //res.status(404).json({ error: 'Task not found' });
  //}
//});
//---------------------------------------------------------------------------------
const serviceAccount = require('./path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Route to receive tasks from the frontend and store in Firestore
app.post('/addTasks', async (req, res) => {
  const receivedTasks = req.body.tasks;

  try {
    // Add tasks to Firestore
    const batch = admin.firestore().batch();
    const tasksCollection = admin.firestore().collection('tasks');
    receivedTasks.forEach(task => {
      const newTaskRef = tasksCollection.doc();
      batch.set(newTaskRef, task);
    });
    await batch.commit();

    console.log('Tasks added to Firestore');
    res.json({ message: 'Tasks received and stored successfully' });
  } catch (error) {
    console.error('Error adding tasks to Firestore:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port - http://localhost:${port}`)
})