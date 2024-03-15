import http from "http"
import app from "./src/app.js";
import { error } from "console";


const server = new http.Server(app);


server.listen(app.get("port"), ()=>{

    console.log("es ahora")
})