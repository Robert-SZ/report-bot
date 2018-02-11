const SaleQuestionsFactory = require('./saleQuestions');

class SaleReport {
    constructor(bot){
        this.bot = bot;
    }
    getQuestion(number) {
        return new SaleQuestionsFactory().getQuestion(number);
    }

}

module.exports = SaleReport;