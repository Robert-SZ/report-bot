class Question {
    constructor(number, question, type, next, report, options) {
        this.number = number;
        this.question = question;
        this.type = type || 'text';
        this.next = (answer)=>{
            return eval(next);
        };
        this.report = report;
        this.options = options;
    }


}

module.exports = Question;