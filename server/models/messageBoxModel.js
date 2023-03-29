const mongoose = require("mongoose");

const MessageBoxSchema = mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adminastor:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    isActive:{
      type:Boolean,
      required:true
    },
    rate:{
      type:String,
      required:false
    },
    messages: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MessagesBox", MessageBoxSchema);

