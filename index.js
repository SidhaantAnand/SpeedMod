var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://theaimers:winners@cluster0-c02uj.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!");
	// we're connected!
});

var SerialPort = require("serialport"); 
var port = new SerialPort("COM10", {
	baudRate : 115200
});



const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);

var classKeyData = "";
var qaKeyData = "";
var paceData = ""; 
parser.on('data', (data) => {
	//console.log(data);
	if(data.includes("started")){
		classKeyData = (new Date()).toISOString();
		console.log("Started");
	}
	if(data.includes("Pace") && !data.includes("Results")){
		paceData = data.substring(data.indexOf(" ")+1);
		if(paceData != ""){
			var paceObject = new Pace({ classKey: classKeyData, pace: paceData, paceTime: (new Date()).toISOString() });
			paceObject.save(function(error) {
				console.log("pace object created");
				if(error){
					console.error(error);
				}
			});
			pace = "";
		}
	}
	if(data.includes("qastarted")){
		qaKeyData = (new Date()).toISOString();
	}
	if(data.includes("A") && data.includes("B") && data.includes("C") && data.includes("D")){
		var a_count = data.substring(data.indexOf("A")+1, data.indexOf("B"));
		var b_count = data.substring(data.indexOf("B")+1, data.indexOf("C"));
		var c_count = data.substring(data.indexOf("C")+1, data.indexOf("D"));
		var d_count = data.substring(data.indexOf("D")+1);
		console.log("A Count: " + a_count);
		console.log("B Count: " + b_count);
		console.log("C Count: " + c_count);
		console.log("D Count: " + d_count);
		var qaObject = new Qa({ classKey: classKeyData, questionKey: qaKeyData, opta: a_count, optb: b_count, optc: c_count, optd: d_count});
		qaObject.save(function(error) {
			console.log("qa object created");
			if(error){
				console.error(error);
			}
		});
	}
	
});

var paceSchema = new mongoose.Schema({
	classKey: String,
	pace: String,
	paceTime: String
});

var Pace = mongoose.model('Pace', paceSchema);

var qaSchema = new mongoose.Schema({
	classKey: String,
	questionKey: String,
	opta: String,
	optb: String,
	optc: String,
	optd: String,
});

var Qa = mongoose.model('Qa', qaSchema);
