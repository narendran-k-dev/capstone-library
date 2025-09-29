const db = require('../model')
const User = db.User;
const bcrypt = require('bcryptjs');
exports.registerUser = async (request, resposne) => {
    try {
        const email = request?.body?.email
        const emailcheck = await User.findOne({email})
        if(emailcheck){
            return resposne.status(400).send({
                message:'email already exsit'
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
        resposne.send(data)
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
        if(!user){
            return response.status(404).send({
                message: 'email not found'
            })
        }
        const matchpassword = await bcrypt.compare(password, user.password)
        if (matchpassword) {
            response.send('logged in successfull')
        }
        else {
            response.status(400).send({
                message: 'password does not match'
            })
        }
    } catch(err) {
        response.status(400).send({
            message: err.message || 'error while login '
        })
    }
}