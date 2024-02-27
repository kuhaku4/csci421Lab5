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
  const dbName = 'blogs';
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(Blog);
    const collection = await db.collection('blogs');
    return ({ client: client, collection: collection })
  }

  catch (err) {
    debug(err);
  }
};

exports.saveBlog = async (req, res) => {
  try {
    const blog = req.body;
    const dbParams = await util.setupDB();
    await dbParams.collection.insertOne(blog);
    dbParams.client.close();
    res.redirect('/');
  }

  catch(err) {
    debug(err);
  }
};

exports.commitComplete = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const blog = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = (blog.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isComplete: status } });
      dbParams.client.close();
      res.redirect('/');
  }

  catch (err) {
      debug(err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const blog = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('confirmDelete', { blog, title: 'Confirm Delete' });
  }

  catch (err) {
    debug(err);
  }
}

exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const blog = await dbParams.collection.deleteOne({ _id: new ObjectId(id) });
    const blogs = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    dbParams.client.close();
    res.redirect('/');
  }

  catch (err) {
    debug(err);
  };
};

exports.blogEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const blog = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('editBlog', { blog, id, title: 'Save Changes' });
  }

  catch (err) {
    debug(err);
  }
};

exports.commitEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = { $set: req.body };
    const dbParams = await util.setupDB();
    await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, blog);
    dbParams.client.close();
    res.redirect('/');
  }

  catch (err) {
    debug(err);
  }
};

const os = require("os");
exports.blogList = async function (req, res) {
  try {
    const dbParams = await util.setupDB();
    const blogs = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    res.render('showBlogs', { blog, title: 'Blog List', hostname });
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
