let mediaRecorder;
let audioChunks = [];
let isListening = false;
let timeout;
let directLine;
let activeAudio = null;
let isVoiceInput = false; // track if conversation stated with voice
let shouldPlayAudio = false;
let isConversationRound = false;
let directLineSecret = null;

// variables
const openAIKey = '';
const speechUrl = '';
const translationsUrl = '';
const directLineUrl = '';


const aiAgent = document.getElementById('aiAgent');


async function getDirectLineSecret(){

    try {
        const responseToken = await fetch(directLineUrl);
        const resultToken = await responseToken.json();
        directLineSecret = resultToken.token;
    } catch (e){
        console.error('❌ Error getting directLineChannel token:', e);
    }
    
}


async function initializeWebChat() {
    await getDirectLineSecret();
    directLine = window.WebChat.createDirectLine({ secret: directLineSecret });

    window.WebChat.renderWebChat(
        {
            directLine: directLine,
            userID: 'user-123',
            sendTypingIndicator: true,
            styleOptions: {
                botAvatarImage: '',
                UserAvatarInitials: 'CPPS'
            }
        },
        document.getElementById('webchat')
    );

    directLine.activity$.subscribe(activity => {
        console.log('Bot response received: ', activity);
        if(activity.type === 'message' && activity.from.role === 'bot' && activity.text){
            setAgentStatus('converting');
            convertTextToSpeech(activity.text);
        }
    })


    document.getElementById('webchat').addEventListener('input', () => {
        console.log('User is typing... Stopping audio & turning off voice mode.');
        isVoiceInput = false;
        stopActiveAudio();
    })

    console.log('WebChat Initialized');
}

document.addEventListener('DOMContentLoaded', async () => { await initializeWebChat(); });


async function setupRecorder() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        }

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, {type: 'audio/mp3'});
            audioChunks = [];
            sendAudioToOpenAI(audioBlob);
        }
    } catch (e) {
        console.error('❌ Error accesing microphone:', e);
        alert('Microphone access denied!');
    }
}

//Manage recording in/out

aiAgent.addEventListener('click', () => {
    stopActiveAudio();
    if(!isListening){
        startRecording();
    } else {
        stopRecording();
    }
})

function startRecording(){
    if (!mediaRecorder) return alert("Microphone not initialized");

    isListening = true;
    isVoiceInput = true; // Mar this as a voice input
    mediaRecorder.start();
    console.log("Recordig started...");

    setAgentStatus('listening');

    timeout = setTimeout(() => {
        stopRecording();
    }, 60000);
}

function stopRecording(){
    if(!isListening) return;

    isListening = false;
    aiAgent.src = imgAssistantNeutral;
    mediaRecorder.stop();
    setAgentStatus('');
    console.log("Recording stopped...");
    clearTimeout(timeout);
}

function stopActiveAudio() {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio = null;
        console.log("🛑 Stopped previous bot response audio.");
    }
}

//END: Manage recording in/out

async function sendAudioToOpenAI(audioBlob){
    console.log("Sending audio to OpenAI Speech-to-Text...");
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.mp3');
    formData.append('model', 'whisper2333');
    formData.append("response_format", "json");

    try {
        const response = await fetch(translationsUrl, {
            method: 'POST',
            headers: { 'api-key': openAIKey },
            body: formData
        });

        const result = await response.json();
        console.log('Transcribed text: ', result.text);
        sendMessageToBot(result.text);
    } catch (e){
        console.error('❌ Error sending audio to OpenAI:', e);
    }
}




async function sendMessageToBot(message){
    console.log(`📨 Sending message to bot: ${message}`);
    shouldPlayAudio = false;
    isConversationRound = true;
    directLine.postActivity({
        from: {id: 'user'},
        type: 'message',
        text: message
    }).subscribe(
        response => {
            console.log(`✅ Message sent. Waiting for bot response...`);        
        },
        error => console.error(`❌ Error sending message:`, error)
    );
}
// Converts text to speech using Azure Audio Speech
async function convertTextToSpeech(text) {
    stopActiveAudio(); // Ensure no overlapping audio

    var payload = {
        "input": text, 
        "voice": "fable", 
        "response_format": "mp3"
    };

    try {
        const response = await fetch(speechUrl, {
            method: 'POST',
            headers: { 
                'api-key': openAIKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        activeAudio = new Audio(audioUrl);
        
        activeAudio.onended = () => { 
          activeAudio = null; 
          setAgentStatus('')
          console.log('🔊 Finished playing bot response.');
         };
        
         activeAudio.play();
         setAgentStatus('speaking');
         console.log('🔊 Playing bot response...');
     } catch (error) {
        setAgentStatus('')
        console.esetAgentStatusrror(`❌ Error generating speech`, error);
     }
}


//Helper 
function setAgentStatus(status){
    aiAgent.classList = status;
}



setupRecorder();