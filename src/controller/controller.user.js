const db = require('../model')
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
exports.registerUser = async (request, resposne) => {
    try {
        const email = request?.body?.email
        const emailcheck = await User.findOne({ email })
        if (emailcheck) {
            return resposne.status(400).send({
                message: 'email already exsit'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request?.body?.password, salt);
        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        })
        const data = await newUser.save();
        resposne.status(200).send({
            message: 'user registration sucessfull !!'
        })
    } catch (err) {
        resposne.status(400).send({
            message: err.message || ' error while registering user '
        })
    }
}

exports.loginUser = async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send({
                message: 'email not found'
            })
        }
        const matchpassword = await bcrypt.compare(password, user.password)
        if (matchpassword) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            response.send(`loggedasdasd in successfull ${token}`)
        }
        else {
            response.status(400).send({
                message: 'password does not match'
            })
        }
    } catch (err) {
        response.status(400).send({
            message: err.message || 'error while login '
        })
    }
}

exports.viewprofie = async (request, response) => {
    try {
        const id = await request.params.id;
        if (!id) {
            return response.status(400).send({
                message: 'id cant be empty'
            })
        }
        const newuser = await User.findById(id)
        if (!newuser) {
            return response.status(400).send({
                message: 'no data found for the user id'
            })
        }
        response.status(200).send(newuser)
    } catch (error) {
        response.status(400).send({
            message: error.message || ' error while fetching user profile'
        })
    }
}

exports.updateProfile = async (request, response) => {
    const id = request.params.id;
    const bodyUserid = request.body.userid
    if (!id) {
        return response.status(400).send({
            message: 'need id to fetch user '
        })
    }
    const checkuser = await User.findById(id)
    if (checkuser.role === 'admin' || checkuser._id.equals(bodyUserid)) {
        User.findByIdAndUpdate(id, request.body, { new: true }).then((data) => {
            if (!data) {
                return response.status(404).send({ message: 'no user found with given id=' + id })
            } else {
                return response.status(200).send({ message: ' user updated successfully' })
            }
        }).catch(err => {
            response.status(400).send({
                message: err.message || "Error updating user with id=" + id
            });
        });
    } else {
        return response.status(403).send({ message: 'sorry u wither have to be an admin or the user to edit profile' })
    }


}