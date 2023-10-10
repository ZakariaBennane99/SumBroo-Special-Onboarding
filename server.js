import mongoose, { connect } from 'mongoose';
import UserModel from './UserModel.js';
import usersList from './usersList.js';
import jwt from 'jsonwebtoken';



const connectDB = async () => {
    try {
      await connect('mongodb+srv://Zak_Ben:4Zvzt6zNLcz20Dqx@serverlessinstance.ppe7yuq.mongodb.net/?retryWrites=true&w=majority');
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

            // Generating the JWT token
            const tokenPayload = {
              userId: savedUser._id,
              platform: 'pinterest'
            };

            const expiresIn = 50 * 60 * 60; // 50 hours in seconds
            const token = jwt.sign(tokenPayload, '876km1qjDUJRQ09wHGCX2pnezvrLY5s', { expiresIn });
            console.log('Generated JWT Token:', token);
            
        } catch (err) {
            console.error('Error adding user', err.message);
        }
    }

    // Close connection when done
    mongoose.connection.close();
};

createUsers(usersList);

