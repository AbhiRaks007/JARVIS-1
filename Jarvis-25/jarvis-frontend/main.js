// main.js
async function sendMessage() {
    const input = document.getElementById("userInput").value;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_OPENAI_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
      })
    });
    const data = await response.json();
    const reply = data.choices[0].message.content;
    speak(reply);
    alert("Jarvis: " + reply);
  }
  
  // Text-to-speech
  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  }
  
  // Voice input
  function startVoice() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function(event) {
      document.getElementById("userInput").value = event.results[0][0].transcript;
      sendMessage();
    };
    recognition.start();
  }
  