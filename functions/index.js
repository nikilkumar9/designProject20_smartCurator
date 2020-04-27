const functions = require('firebase-functions');

/**********************************************************************************/
/********************************Alexa Skill***************************************/
/************************************************+++++++++++++++++++++++++++++++++*/
exports.alexaSkill = functions.https.onRequest((request, response) => {
    const type = JSON.stringify(request.body.request.type);
    const name = JSON.stringify(request.body.request.intent.name);

    const result = getAlexaResponse(type, name);

    response.send(result);
});

const getAlexaResponse = (type, name) => {
    var AlexaDefaultAnswer = {
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>"
            },
            "shouldEndSession": true,
            "card": {
                "type": "Simple",
                "title": "LaunchRequest",
                "content": "Welcome to the Alexa Skills Kit, you can say hello!"
            }
        },
        "userAgent": "ask-node/2.3.0 Node/v8.10.0",
        "sessionAttributes": {}
    }

    if (type === '"LaunchRequest"') {
        return AlexaDefaultAnswer;
    } else if (type === '"IntentRequest"' && name === '"GetCurrentTimeIntent"') {
        AlexaDefaultAnswer.response.outputSpeech.ssml = "<speak>" + "No worries!" + "</speak>";
        return AlexaDefaultAnswer;
    } else {
        return AlexaDefaultAnswer;
    }

};