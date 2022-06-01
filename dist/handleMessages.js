"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessages = handleMessages;

var _config = _interopRequireDefault(require("./configs/config.json"));

var _SendWellcomeMessageController = require("./modules/vedasDelivery/useCases/sendWellcomeMessageUseCase/SendWellcomeMessageController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendWellcomeMessageController = new _SendWellcomeMessageController.SendWellcomeMessageController();
const apiKey = _config.default.chave_da_api;

async function handleMessages(whatsappInstance) {
  return whatsappInstance.onMessage(async message => {
    if (message.isGroupMsg) return;
    await sendWellcomeMessageController.handle(whatsappInstance, apiKey, message);
  });
}