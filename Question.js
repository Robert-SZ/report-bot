class Question {
    constructor(number, question, type, next, sendToChat) {
        this.number = number;
        this.question = question;
        this.type = type || 'text';
        this.next = (answer)=>{
            return eval(next);
        };
        this.sendToChant = sendToChat;
    }


}

module.exports = Question;