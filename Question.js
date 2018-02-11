class Question {
    constructor(number, question, type, next, report) {
        this.number = number;
        this.question = question;
        this.type = type || 'text';
        this.next = (answer)=>{
            return eval(next);
        };
        this.report = report;
    }


}

module.exports = Question;