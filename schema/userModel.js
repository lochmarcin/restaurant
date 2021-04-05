const mongoose =require('mongoose')

const user = new mongoose.Schema({
   username: String,
   password: String,
   email: String,
   isDeleted: Boolean,
   dateCreated: Date
})

// export default mongoose.model("User",user)
module.exports = mongoose.model("User",user)