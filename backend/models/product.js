const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  isPurchased: {
    type: Boolean,
    default: false,
  },
  price:{
    type:String,
    required:true
  }
}, {
  timestamps: true,
});
const Product=mongoose.model('Product',itemSchema);
module.exports = Product