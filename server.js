var express = require("express");
var app = express();
app.get("/:parameter",function(req, res){
    var unix = null, natural = null;
    var answer = {
      "unix" : unix,
      "natural" : natural
    };
    var date;
    var timestamp = req.params.parameter;
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (!isNaN(timestamp)){                 //if parameter is a number
        date = new Date(timestamp*1000);       
        answer.natural = months[date.getMonth()]+" "+date.getDate()+","+" "+date.getFullYear();
        answer.unix = Number(timestamp);
    }
    else{                                    
        date = new Date(timestamp);
        if(date.getFullYear()===undefined||isNaN(date.getFullYear())||date.getMonth()===undefined||isNaN(date.getMonth())||date.getDate()===undefined||isNaN(date.getDate())){
            //Do nothing as unix and natural are already set as null.
        }
        else{
            answer.natural = months[date.getMonth()]+" "+date.getDate()+","+" "+date.getFullYear();
            date = new Date(answer.natural);
            answer.unix = (date.getTime()/1000);
        }
    }
    console.log(JSON.stringify(answer));
    res.send(JSON.stringify(answer));
});

app.listen(8080, function(){
   console.log("Server istening on port 8080.") 
});