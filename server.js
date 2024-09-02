import {app} from "./app.js";
import dbconnect from "./db/mongoose.js";

dbconnect();
app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT || ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
    
});