const { User } = require('../models');



const userController = {

    //create user
    createUser({ body }, res){
        User.create(body)
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
    // update user by id
    updateUser({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUser => {
            if(!dbUser){
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
    },
    // delete user by id
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //get user by id
    getOneUser({ params }, res){
        User.findOne( { _id: params.id } )
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //get all users
    getAllUser(req, res){
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsers => {
                res.json(dbUsers);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //add friend
    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbFriend => {
            if(!dbFriend){
                res.sendStatus(404).json({ message: "There is no user with this id!" });
                return;
            }
            res.json(dbFriend);
        })
        .catch(err => res.json(err));
    },
    // remove friend
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbFriend => res.json(dbFriend))
        .catch(err => res.json(err));
    }
};




module.exports = userController;