const Discord = require('discord.js');
const client = new Discord.Client();
const sentiment = require('sentiment');
const util = require('util');

// define globals
let apiToken = process.env.API_TOKEN;
let cmdPrefix = '!disco';

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var discoCommand = new RegExp('^' + cmdPrefix);
  if (discoCommand.test(message.content))
    return processDirectCommand(message);

});

client.login(apiToken);

function processDirectCommand(message) {
  // -------------------------------
  // report <user/channel>
  // generates a report on the user/channel specified
  // if none specified, produces a general report
  var reportRegex = new RegExp('^' + cmdPrefix + ' report');
  // -------------------------------
  // analyze <text>
  // submits the text for immediate sentiment analysis
  // and return the result
  var analyzeRegex = new RegExp('^' + cmdPrefix + ' analyze');



  if (reportRegex.test(message.content))
    return generateReport(message);
  else if (analyzeRegex.test(message.content))
    return analyzeText(message);
}
function generateReport(message) {
  message.reply('here\'s the report you asked for');
}

function analyzeText(message) {
  var result = sentiment(message.content);
  console.log(result);
  var response = util.format('Your sentence received a score of %s.  ',
    result.score);
  if (result.score < -10)
    response += 'That is... awful, and you should feel bad.';
  else if (result.score < -5)
    response += 'That indicates that you are, in fact, a bad person.';
  else if (result.score < 0)
    response += 'That\'s a bit mean, isn\'t it?';
  else if (result.score > 10)
    response += 'Wow, you\'re a shining example of human decency.';
  else if (result.score > 5)
    response += 'Jeez, what a nice thing to say!';
  else if (result.score >= 0)
    response += 'That\'s in the realm of normalcy.';

  message.reply(response);
}
