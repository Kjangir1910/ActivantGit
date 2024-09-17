const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const bodyParser = require ('body-parser')


const app = express()

app.use(cors())
app.use(bodyParser.json())

// const mongoURI = 'mongodb+srv://erkjangid2000:Kuldeep%40321@cluster0.4mhtsym.mongodb.net/API-1?retryWrites=true&w=majority&appName=Cluster0'

const mongoURI = 'mongodb+srv://erkjangid2000:Kuldeep123@cluster0.numut.mongodb.net/Activant?retryWrites=true&w=majority&appName=Cluster0'
// Connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.log('Error connecting to MongDb', error);
})

// Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String, 
    address: String
})

const User = mongoose.model('User', UserSchema)


// Form Submission

app.post('/api/users', async (req, res) => {
    const {name, email, address} = req.body
    const newUser = new User({name, email, address})

    try {await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({error: 'unable to save user'})
    }
})


// Get users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({error: "Unable to fetch users"})
    }
})

// Server
const PORT = process.env.port || 5000
app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
})
