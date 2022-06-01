"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WellcomeMessageRepository = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../../../../configs/config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WellcomeMessageRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _axios.default;
    this.repository.defaults.baseURL = _config.default.VEDAS_DELIVERY_SERVIDOR;
  }

  async getWellcomeMessageByApiKey(apiKey) {
    const {
      data
    } = await this.repository({
      url: "/wellcome-message",
      method: "get",
      params: {
        apiKey
      }
    });
    return data.wellcomeMessage;
  }

}

exports.WellcomeMessageRepository = WellcomeMessageRepository;