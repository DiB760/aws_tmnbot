var TMNBot = require('../bot');
var _ = require('underscore');
var repl = require('repl');
var jf = require('jsonfile');

jf.readFile('./toke-config.js', function (err, config) {
var bot = new TMNBot({username: '🚬', password: '564ac03d52c6'});
//var bot = new TMNBot({username: '420_BOT', password: 'timetosmoke'});

var today = new Date();

Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
//1st array is DST ON second is DST OFF
if (today.dst()) {
    dst = ['Anchorage, AK', 'Marquesas Islands, French Polynesia', 'Honolulu, United States', 'Pago Pago, American Samoa', 'Auckland, New Zealand', 'Micronesia', 'Sydney, Australia', 'Tokyo, Japan', 'Hong Kong, China', 'Bangkok, Thailand', 'Dhaka, Bangladesh', 'Pakistan', 'Abu Dhabi, United Arab Emirates', 'Athens, Greece', 'Madrid, Spain', 'London, UK', 'Reykjavík, Iceland', 'Ponta Delgada, Portugal in the Azores', 'Fernando de Noronha, Brazil', 'Rio de Janeiro, Brazil', 'New York, NY', 'Chicago, IL', 'Denver, CO', 'San Diego, CA', 'Anchorage, AK'];
} else {
       dst = ['San Diego, CA', 'Anchorage, AK', 'Honolulu, United States', 'Pago Pago, American Samoa', 'Auckland, New Zealand', 'Micronesia', 'Sydney, Australia', 'Tokyo, Japan', 'Hong Kong,', 'Bangkok, Thailand', 'Dhaka, Bangladesh', 'Pakistan', 'Abu Dhabi, United Arab Emirates', 'Djibouti', 'Athens, Greece', 'Madrid, Spain', 'London, UK', 'Ponta Delgada, Portugal in the Azores', 'Fernando de Noronha, Brazil', 'Buenos Aires, Argentina', 'La Paz, Bolivia', 'New York, NY', 'Chicago, IL', 'Denver, CO', 'San Diego, CA']; 
}

var d = new Date();
var m = d.getUTCMinutes();
var n = d.getUTCHours();
var s = d.getSeconds();
n = (m > 20) ? n+1:n;
a = (m > 20) ? (60-Math.abs(m - 20)):Math.abs(m - 20);
var counting = false;
var count = 0;

setInterval(function () {
  var d = new Date();
  var m = d.getUTCMinutes();
  var n = d.getUTCHours();
  var s = d.getSeconds();
  //if it's after 4:20 then add one so it pick the next timezone in the array
  n = (m > 20) ? n+1:n;
  //get the minutes until 420 with dirty math
  a = (m > 20) ? (60-Math.abs(m - 20)):Math.abs(m - 20);
  //I think this is the minute check for starting the more finite timer
  if (m == 18 && counting != true) {
    count = count+1;
    var qt = setInterval(function() {
      counting = true;
      var d = new Date();
      if (d.getUTCMinutes() == 19 && d.getSeconds() == 59){
	var d = new Date();
	var n = d.getUTCHours();
        clearInterval(qt);
        counting = false;
        bot.call('chat.post', {
          message: 'Happy 420: ' + dst[n] + ' ! https://s3-us-west-1.amazonaws.com/gabbz/gomok420.gif'
        });
      } else if (d.getUTCMinutes() == 19 && d.getSeconds() == 0) {
	bot.call('chat.post', {
	  message: '4:20 in one minute; get ready!'
	});
      }
    }, 1000);
  }
}, 10000);


  bot.on('chat', function (event) {
    if (typeof event === 'string') {
      try {
        event = JSON.parse(event);
      } catch (e) {
        return false;
      }
    }
    if (event.type === 'message') {
      if (event.message.toLowerCase() === '!soon' && event.user.mod) {
		var d = new Date();
		var m = d.getUTCMinutes();
		var n = d.getUTCHours();
		var s = d.getSeconds();
		n = (m > 20) ? n+1:n;
		a = (m > 20) ? (60-Math.abs(m - 20)):Math.abs(m - 20);
		bot.call('chat.post', {
		  message: 'Next 4:20 coming up for ' + dst[n] + ' in ' + a + ' minutes!'
		});
      } else if (event.message.toLowerCase() === "!butts") {
        bot.call('chat.post', {
	  message: 'http://33.media.tumblr.com/5e7650faa1303358566b31ac27ba0060/tumblr_mv3df3xnzE1skfk58o1_1280.jpg'});
      }
    }
  });
  repl.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout,
    useGlobal: true
  });
});
