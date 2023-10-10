import mongoose from 'mongoose';
import UserModel from './UserModel';
import usersList from '';



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Zak_Ben:HitOsQDcsfEWmypK@serverlessinstance.ppe7yuq.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};

// connect to connectDB
connectDB();



const createUsers = async (users) => {
    for (let userData of users) {
        try {
            const newUser = new UserModel({
                accountStatus: 'active',
                socialMediaLinks: [{
                    platformName: 'pinterest',
                    profileLink: userData.profileLink,
                    profileStatus: 'pendingPay',
                    niche: userData.niche,
                    audience: userData.audience
                }]
            });

            const savedUser = await newUser.save();
            console.log('User added successfully:', savedUser._id);
            
        } catch (err) {
            console.error('Error adding user', err.message);
        }
    }

    // Close connection when done
    mongoose.connection.close();
};

createUsers(usersList);

