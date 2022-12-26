const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
const outputFile = 'output.mp3';
const request = {
    input: {
        ssml: '<speak> <voice gender="MALE"> hello </voice> </speak>'
    },
    voice: { languageCode: 'en-GB', ssmlGender: 'MALE' },
    audioConfig: {
        audioEncoding: 'LINEAR16'
    },
    sampleRateHertz: 16000
};
async function audio() {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
}
audio();
