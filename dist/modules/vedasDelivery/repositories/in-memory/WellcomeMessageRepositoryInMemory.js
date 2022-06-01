"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WellcomeMessageRepositoryInMemory = void 0;
const wellcomeMessageMock = {
  id: 1,
  title: "teste",
  message: "teste",
  company_id: 1,
  created_at: new Date(),
  updated_at: new Date()
};

class WellcomeMessageRepositoryInMemory {
  constructor() {
    this.repository = wellcomeMessageMock;
  }

  async getWellcomeMessageByApiKey() {
    return this.repository;
  }

}

exports.WellcomeMessageRepositoryInMemory = WellcomeMessageRepositoryInMemory;