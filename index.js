const express = require("express");

const port = 2000;
const app  = express();
app.use(express.json());
const UserRouter = require('./routes/user')
const AdminRouter = require("./routes/admin")


app.use("/user",UserRouter)
app.use("/admin",AdminRouter)

        
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
