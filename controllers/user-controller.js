import User from '../models';
import Thought from '../models';

// const req = require('express/lib/request');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User successfully deleted!' });
      })
      .catch(err => res.json(err));
  },

  // add Friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No friend with this id' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete Friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
};

export default userController;
