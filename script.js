const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const voiceBtn = document.getElementById("voice-btn");
const voiceMode = document.getElementById("voice-mode");
const ttsToggle = document.getElementById("tts-toggle");
const clockEl = document.getElementById("clock");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const supportsRecognition = Boolean(SpeechRecognition);

const recognition = supportsRecognition
  ? new SpeechRecognition()
  : null;

if (recognition) {
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("pt-BR");
}

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function speak(text) {
  if (!ttsToggle.checked || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function jarvisReply(input) {
  const text = input.toLowerCase();

  if (text.includes("que horas") || text.includes("horário") || text.includes("horas")) {
    return `Agora são ${new Date().toLocaleTimeString("pt-BR")}.`;
  }

  if (text.includes("status")) {
    return "Todos os sistemas estão operando dentro dos parâmetros. Energia em 100%.";
  }

  if (text.includes("modo foco")) {
    document.body.style.filter = "saturate(0.9) contrast(1.1)";
    return "Modo foco ativado. Notificações não críticas silenciadas.";
  }

  if (text.includes("abrir painel") || text.includes("sistemas")) {
    return "Painel de sistemas em destaque. Telemetria preparada para monitoramento.";
  }

  if (text.includes("missão")) {
    return "Missão atual: construir um assistente pessoal lendário. Progresso: excelente.";
  }

  if (text.includes("olá") || text.includes("oi") || text.includes("jarvis")) {
    return "Olá! Pronto para comandos. Como posso ajudar hoje?";
  }

  return "Comando recebido. Posso executar ações, informar status ou seguir com nova instrução.";
}

function processUserInput(text) {
  const cleaned = text.trim();
  if (!cleaned) return;
  addMessage("user", cleaned);
  const reply = jarvisReply(cleaned);
  addMessage("jarvis", reply);
  speak(reply);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  processUserInput(chatInput.value);
  chatInput.value = "";
});

document.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => processUserInput(btn.dataset.command));
});

if (!supportsRecognition) {
  voiceBtn.disabled = true;
  voiceBtn.textContent = "Navegador sem suporte a voz";
  voiceMode.textContent = "Indisponível";
} else {
  voiceBtn.addEventListener("click", () => {
    voiceMode.textContent = "Escutando...";
    voiceBtn.classList.add("listening");
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    voiceMode.textContent = "Comando capturado";
    processUserInput(transcript);
  };

  recognition.onerror = () => {
    voiceMode.textContent = "Erro ao ouvir comando";
  };

  recognition.onend = () => {
    voiceBtn.classList.remove("listening");
    if (voiceMode.textContent === "Escutando...") {
      voiceMode.textContent = "Aguardando";
    }
  };
}

setInterval(updateClock, 1000);
updateClock();
addMessage("jarvis", "Inicialização concluída. Eu sou o Jarvis. Aguardando instruções.");
