import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the hashed password of the current user
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.pre does something before saving the user to the database
userSchema.pre('save', async function (next) {
  // If the password is not modified, move on to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Replace the current password with the hashed password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
