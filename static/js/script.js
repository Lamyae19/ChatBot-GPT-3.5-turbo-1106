setInterval(highlightAll,1000);
// Function to highlight code using highlight.js library
function highlightAll() {
  document.querySelectorAll("pre code").forEach(block => {
    thees.highlightBlock(block);
  });
}

// Call the highlightAll function at regular intervals
setInterval(highlightAll, 1000);

const chatBox = document.querySelector("#chat-box");
const messageInput = document.querySelector(".user-input");
const sendBtn = document.querySelector(".send-button");

function addMessage(message, isUserMessage) {
  const messageLi = document.createElement("li");
  if (isUserMessage) {
    messageLi.classList.add("message-input");
  } else {
    messageLi.classList.add("message-bot");
  }
  messageLi.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(messageLi);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== "") {
    addMessage(message, true);
    messageInput.value = "";
    fetch("/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_input: message })
    })
      .then(response => response.json())
      .then(data => {
        messageInput.value = "";
        const messageLi = document.createElement("li");
        messageLi.classList.add("message-bot");

        var content = data.content;
        // Check if the content has code block
        const hasCodeBlock = content.includes("```");
        if (hasCodeBlock) {
              // If the content has code block, wrap it in a <pre><code> element"'rtk
              content = content.replaceAll("<" , "&lt").replaceAll("> ","&gt")
              const codeContent1 = content.replace(/```([\s\S]+?)```/g, '</p><pre><code>$1</code></pre><p>');

              messageLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><div class="message-bot-show"><p>${codeContent1}</p></div>`

            }

            else{
              const codeContent2 = content.replace(/\n/g, "<br>");
              messageLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><div class="message-bot-show"><p>${codeContent2}</p></div>`
            }
            chatBox.appendChild(messageLi);
            chatBox.scrollTop = chatBox.scrollHeight;
      })
      .catch(error => console.error(error));

  }
}


sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", event => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

