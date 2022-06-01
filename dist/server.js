"use strict";

var _venomBot = require("venom-bot");

var _config = _interopRequireDefault(require("./configs/config.json"));

var _handleMessages = require("./handleMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function startWhatsBOT() {
  try {
    const whatsappInstance = await (0, _venomBot.create)({
      session: _config.default.nome_da_empresa,
      multidevice: _config.default.mutiplos_dispositivos
    });
    await (0, _handleMessages.handleMessages)(whatsappInstance);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Erro ao executar whatsapp: ", error);
  }
}

(async function main() {
  await startWhatsBOT();
})();
