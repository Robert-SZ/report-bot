const roles = require('./roles.json');
const Question = require('./Question');

class QuestionsProviders {
    getRoles() {
        return roles.roles.map(item => item.role.name);
    }

    getQuestionByRole(name, number) {
        let role = roles.roles.filter(item => item.role.name === name);
        if (!role[0])
            throw new Error("Specified role doesn't exists");
        let question = role[0].role.questions.filter(q => q.number === number)[0];
        return !!question ? new Question(question.number, question.question, question.type, question.next, question.sendToChat) : null;

    }
}

module.exports = QuestionsProviders;