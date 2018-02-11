const MarketologQuestionsFactory = require('./marketologQuestions');

class MarketologReport {
    constructor(bot){
        this.bot = bot;
    }
    getQuestion(number) {
        return new MarketologQuestionsFactory(this.bot).getQuestion(number);
    }

}

module.exports = MarketologReport;