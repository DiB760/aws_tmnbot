aws_tmnbot
==========

Trees Movie Night Bot on AWS Beanstalk


This method uses the  AWS Elastic Beanstalk Command Line Tool from http://aws.amazon.com/code/6752709412171743 to deploy an
AWS Node.js EB instance from the CLI and runs the Tokebot code.


Follow the instructions from http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.sdlc.html on how to
configure/setup an EB instance from the CLI if you are unsure how.


To start it should be as simple as:

$git clone https://github.com/obmas/aws_tmnbot.git

$cd aws_tmnbot

$eb start

$git aws.push


Thank you to Simon for Trees Movie Night and making the bot code available:
https://github.com/Simonify/treesmovienight-bot
