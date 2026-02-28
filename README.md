# Jarvis Futurista (Web)

Painel estilo futurista com chat Jarvis, respostas por voz (TTS) e comando por voz (SpeechRecognition do navegador).

## Funcionalidades

- Interface futurista com layout de painel.
- Chat por texto com respostas do Jarvis.
- Botão para captar comando por voz (pt-BR).
- Respostas em voz sintetizada (pt-BR), com opção para desligar.
- Ações rápidas para comandos comuns.

## Requisitos

- Navegador moderno com suporte a:
  - `SpeechRecognition` (ou `webkitSpeechRecognition`)
  - `speechSynthesis`

> Observação: em alguns navegadores o reconhecimento de voz funciona melhor em HTTPS ou `localhost`.

## Como rodar

No diretório do projeto:

```bash
python3 -m http.server 4173
```

Depois abra:

- http://localhost:4173

## Próximos passos

- Integrar com backend (FastAPI/Node) e LLM via API.
- Integrar com Home Assistant, calendário e automações.
- Adicionar autenticação e confirmação para comandos sensíveis.
