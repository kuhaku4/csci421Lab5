exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

var request = require('request');

var apiOptions = {
  server : "http://52.91.47.28:80"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://52.91.47.28:80";
}

const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:utilController');

exports.setupDB = async function () {
  const url = process.env.DB_URL;
  debug(`attempting to connect to database at ${url}`);
  const dbName = 'tasks';
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = await db.collection('tasks');
    return ({ client: client, collection: collection })
  }

  catch (err) {
    debug(err);
  }
};

exports.saveTask = async (req, res) => {
  try {
    const task = req.body;
    const dbParams = await util.setupDB();
    await dbParams.collection.insertOne(task);
    dbParams.client.close();
    res.redirect('/');
  }

  catch(err) {
    debug(err);
  }
};

const util = require('./utilController');

exports.commitComplete = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = (task.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isComplete: status } });
      dbParams.client.close();
      res.redirect('/');
  }

  catch (err) {
      debug(err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('confirmDelete', { task, title: 'Confirm Delete' });
  }

  catch (err) {
    debug(err);
  }
}

exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.deleteOne({ _id: new ObjectId(id) });
    const tasks = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    dbParams.client.close();
    res.redirect('/');
  }

  catch (err) {
    debug(err);
  };
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('editTask', { task, id, title: 'Save Changes' });
  }

  catch (err) {
    debug(err);
  }
};

exports.commitEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const task = { $set: req.body };
    const dbParams = await util.setupDB();
    await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, task);
    dbParams.client.close();
    res.redirect('/');
  }

  catch (err) {
    debug(err);
  }
};

const os = require("os");
exports.showTasks = async function (req, res) {
  try {
    const dbParams = await util.setupDB();
    const tasks = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    res.render('showTasks', { tasks, title: 'ToDo List', hostname });
    dbParams.client.close();
  }
  
  catch (err) {
    debug(err);
  }
}


exports.list = (req, res) => {
  res.render('blogList', {title: 'Blog List',
    blogs: [{
      blogtitle: 'test',
      blogtext: 'test text',
      createdDate: Date.now()
    },
  {
    blogtitle: 'Nah I\'d Win',
    blogtext: 'Didn\'t Win',
    createdDate: Date.now()
  },
  {
    blogtitle: 'My First Blog',
    blogtext: 'This is a boring blog',
    createdDate: Date.now()
  }]
})
};


module.exports.addBlog = function(req,res){
  res.render('blog-add-form',{
    title:'Add a blog',
    pageHeader:{
      title: 'blog adder'
    }
  })
};
