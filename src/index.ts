import express,{Request , Response} from "express"
import { Client } from "@heroiclabs/nakama-js";
import { config } from "dotenv";

const app = express();
config();

const PORT_NUMBER = process.env.PORT_NUMBER || 3000;

// connect to nakama server using nakama-js client
const newClient = new Client(process.env.NAKAMA_KEY, process.env.NAKAMA_URL, process.env.NAKAMA_PORT);

app.get('/' , (req:Request , res:Response)=>{
    res.status(200).json({
        "message":"root is working"
    })
});

// get timeout
app.get('/timeout' , (req:Request , res:Response)=>{
    try{
        const timeOut = newClient.timeout;
        res.status(500).json({
            "message":`time out is ${timeOut}`
        });

    }catch(ex){
        // log thee error
        console.log(ex);
        res.status(500).json({"message":"server error"});
    }
})

app.listen(PORT_NUMBER , ()=>{
    console.log("server running");
})