const roles = require('./roles.json');

class QuestionsProviders{
    getRoles(){
        return roles.roles.map(role=>role.name);
    }

    getQuestionByRole(role, number){

    }
}

module.exports = QuestionsProviders;