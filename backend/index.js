import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({})

const app = express();
//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',  // Allows requests only from this specific domain
    credentials: true,                // Allows cookies and credentials to be sent with the request
};
app.use(cors(corsOptions));  // Apply the CORS configuration to the app

const PORT = process.env.PORT||3000;

//api
app.use("/api/v1/user",userRoute);//userRoute is middleware for this specific path
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
        success: false
    });
});
