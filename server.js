const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
// ---- communication code------------------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





const { Server } = require('socket.io');
// server connect
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
        
    }
});

server.listen(5000, function () {
    console.log("server started at port 5000");
});

app.use(express.static('public'));

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
    // const smartAI = data => {
    //     if(data === "Greet"){

    //     }
    // }

    socket.on("luis", (data) => {
        // smartAI(data);
        console.log("received question: "+ data)
        if(data === ""){
            answer = "How can I help u? ";
        }
        else if( data === "patient Name"){
            answer = "What is your age? ";
        }
        else if( data === "contact number"){
            answer = "What days are best for you to make an appointment? ";
        }
        else if( data === "treatment category"){
            answer = "we offer Vaccination, injury treatment, dental and eye care ! ";
        }
        else if( data === "appointment day"){
            answer = "What is the suitable time for you? (from 8AM-9PM)";
        }
        else if( data === "appointment time"){
            answer = "Thank you. someone will contact you soon.";
        }
        else if( data === "patients age"){
            answer = "Please provide your contact number!";
        }
        else if( data === "Appointment Category"){
            answer = "You need an appointment. what is your name?";
        }

        else if( data === "emergency"){
            answer = "I will sign you up for an emergency doctor ";
        }
        else if( data === "Greet"){
            answer = "Hallo, Nice to meet u, Im AI chatbot to help patients, How can I help u? ";
        }
        else if( data === "Cancel Appointment"){
            answer = "which appointment to cancel?"
            if(data === "Appointment Category"){
                answer = "you name please?"
                if(data === "patient Name"){
                    answer = " Okey. appointment is cancelled"
                }

            }
        }
        else if( data === "Who are you"){
            answer = "I am AI chatbot to help patients ";
        }
        // place your bot-code here !!!
        else if(data === "Appointment"){
            answer = " What type of appointment do you want? e.g : eye care, dental etc !";
        }
        else {
            answer = " Sorry I couldn't understand you. Could you say that in another way? If its not related to take an appointment, I'm afraid I will not be able to help you with it! :( \"" + data + "\" Unknown Category";
        }

     
        
        
        socket.emit("answer", answer);
    });
});
