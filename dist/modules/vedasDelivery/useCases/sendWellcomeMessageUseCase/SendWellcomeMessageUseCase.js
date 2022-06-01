"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendWellcomeMessageUseCase = void 0;

var _dateFns = require("date-fns");

var _config = _interopRequireDefault(require("../../../../configs/config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SendWellcomeMessageUseCase {
  constructor(whatsBot, wellcomeMessageRepository) {
    this.whatsBot = whatsBot;
    this.wellcomeMessageRepository = wellcomeMessageRepository;
  }

  async execute(apiKey, newMessage) {
    const successMessage = "Mensagem enviada com sucesso";

    try {
      const wellcomeMessage = await this.wellcomeMessageRepository.getWellcomeMessageByApiKey(apiKey);
      if (!wellcomeMessage) return "Mensagem de boas vindas não encontrada";
      const allMessages = await this.whatsBot.getAllMessagesInChat(newMessage.chatId, true, false);
      const lastWellcomeMessageIndex = allMessages.reduce((previous, current, currentIndex) => {
        if (current.content && current.content.includes(wellcomeMessage.message)) return currentIndex;
        return previous;
      }, -1);
      const alreadySentWellcomeMessage = allMessages[lastWellcomeMessageIndex];
      const lastMessage = allMessages[allMessages.length - 1];

      if (!alreadySentWellcomeMessage) {
        await this.whatsBot.sendText(newMessage.from, wellcomeMessage.message);
        return successMessage;
      }

      const alreadySentWellcomeMessageDate = new Date(alreadySentWellcomeMessage.timestamp * 1000);
      const lastMessageDate = new Date(lastMessage.timestamp * 1000);
      const differenceBetweenCurrentDateAndLastMessageDate = (0, _dateFns.differenceInHours)(lastMessageDate, alreadySentWellcomeMessageDate);
      const shouldResendWellcomeMessage = differenceBetweenCurrentDateAndLastMessageDate >= Number(_config.default.INTERVALO_EM_HORAS || 24);

      if (shouldResendWellcomeMessage) {
        await this.whatsBot.sendText(newMessage.from, wellcomeMessage.message);
        return successMessage;
      }

      return successMessage;
    } catch (e) {
      return `Erro ao enviar mensagem de boas vindas: ${e.message || JSON.stringify(e)}`;
    }
  }

}

exports.SendWellcomeMessageUseCase = SendWellcomeMessageUseCase;