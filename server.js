const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    gender: String,
});

const User = mongoose.model('User', UserSchema);

// Sign Up Route
app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send({ success: true });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});

// Sign In Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        res.send({ success: true });
    } else {
        res.send({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
