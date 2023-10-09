import express from 'express';
import { connect, Schema, model } from 'mongoose';
import { json } from 'body-parser';

const app = express();

// Body Parser Middleware
app.use(json());

// Connect to MongoDB
connect('mongodb+srv://Zak_Ben:HitOsQDcsfEWmypK@serverlessinstance.ppe7yuq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Create a data schema and model
const DataSchema = new Schema({
  name: String,
  value: String,
});

const Data = model('Data', DataSchema);

// Routes
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
