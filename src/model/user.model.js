module.exports = mongoose => {
    var schema = mongoose.Schema({
        username: String,
        email: { type: String, immutable: true },
        password: { type: String, immutable: true },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }, {
        timestamps: true, optimisticConcurrency: true
    })
    const User = mongoose.model('User', schema)
    return User
}



