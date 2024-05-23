import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Thought = mongoose.model('Thought', thoughtSchema);

export default Thought;
