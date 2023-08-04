const mongoose = require("mongoose");
// Middleware
// const db = 'mongodb+srv://ecommerceapp:ecommerceapp@cluster0.uu09u33.mongodb.net/ecommerceapp?retryWrites=true&w=majority'
//const db = 'mongodb+srv://personalexpense:personalexpense@cluster0.eg4rfsk.mongodb.net/personalexpense?retryWrites=true&w=majority'
//const db='mongodb+srv://Expense-Tracker-App:Expense-Tracker-App@cluster0.mebv2uy.mongodb.net/Expense-Tracker-App?retryWrites=true&w=majority'
const db='mongodb+srv://Expense-Tracker:Expense-Tracker@cluster0.6u7jntn.mongodb.net/Expense-Tracker?retryWrites=true&w=majority'
// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017