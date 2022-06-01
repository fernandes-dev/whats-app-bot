"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendWellcomeMessageController = void 0;

var _WellcomeMessageRepository = require("../../infra/axios/WellcomeMessageRepository");

var _SendWellcomeMessageUseCase = require("./SendWellcomeMessageUseCase");

class SendWellcomeMessageController {
  async handle(whatsappInstance, apiKey, newMessage) {
    const wellcomeMessageRepository = new _WellcomeMessageRepository.WellcomeMessageRepository();
    const sendWellComerMessageUseCase = new _SendWellcomeMessageUseCase.SendWellcomeMessageUseCase(whatsappInstance, wellcomeMessageRepository);
    const message = await sendWellComerMessageUseCase.execute(apiKey, newMessage); // eslint-disable-next-line no-console

    console.log(`${message} - CONTATO: ${newMessage.from}`);
  }

}

exports.SendWellcomeMessageController = SendWellcomeMessageController;