const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {

    // Create a User
    const user = new User({
        fullName: req.body.fullName,
        department: req.body.department,
        position: req.body.position,
        qrCode: req.body.qrCode,
    });

    // Save User in the database
    User.init()
        .then(() => User.create(user))
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

exports.findByQR = (req, res) => {
    User.findOne({ qrCode: req.params.qrCode })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with code " + req.params.qrCode
            });            
        }
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving user with code " + req.params.qrCode
        });
    });
}

// Update a note identified by the userId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        fullName: req.body.fullName,
        department: req.body.department,
        position: req.body.position,
        qrCode: req.body.qrCode,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};