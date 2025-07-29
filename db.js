const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://post:123@post.wlnpcju.mongodb.net/loginform?retryWrites=true&w=majority&appName=Post',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
