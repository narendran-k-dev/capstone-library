module.exports = mongoose => {
    var schema = mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['user', 'admin'], 
            default: 'user'
        }
    }, {
        timestamps: true
    })
    const User = mongoose.model('User', schema)
    return User
}



