const fs = require('fs');
const StateMachine = require('javascript-state-machine');
const TelegramBot = require('node-telegram-bot-api');
const MarketologReport = require('./marketologReport');
const SaleReport = require('./saleReport');
const variables = require('./variables.json');
const QuestionsProvider = require('./QuestionsProviders');
const questionsProvider = new QuestionsProvider();



const token = '483294605:AAGOr-Xzc8AB126zSocXyj4g37GZ5LgKdfw';
const bot = new TelegramBot(token, {polling: true});

let roles = questionsProvider.getRoles();
let users = {};

const YES = '✅ Да';
const NO = '❌ Нет';


const getNewState = (state) => {
    let fsm = new StateMachine({
        init: state || 'new',
        transitions: [
            {name: 'toRole', from: 'new', to: 'role'},
            {name: 'toWaitForRole', from: 'role', to: 'waitForRole'},
            {name: 'toWaitForReport', from: ['waitForRole', 'fillReport'], to: 'waitForReport'},
            {name: 'toFillReport', from: 'waitForReport', to: 'fillReport'}
        ],
        // methods: {
        //     onName: function () {
        //         console.log('I named')
        //     },
        //     onRole: function () {
        //         console.log('I froze')
        //     }
        // }
    });
    return fsm;
};

const saveUsers = () => {
    let json = JSON.stringify(users);
    fs.writeFile("./tmp/test.tmp", json, (msf) => {

    });
};

const loadUsers = () => {
    if (fs.existsSync("./tmp/test.tmp")) {
        let json = fs.readFileSync("./tmp/test.tmp");
        users = JSON.parse(json);
    }
};

const getUser = (msg) => {
    if (users[msg.from.id]) {
        let user = users[msg.from.id];
        user.lastActivityDate = new Date();
        return user;
    }
    let user = {
        lastActivityDate: new Date(),
        currentState: undefined,
        chatId: msg.chat.id,
        id: msg.from.id,
        name: msg.from.first_name + ' ' + msg.from.last_name,
        role: undefined,
        report: {
            date: new Date(),
            currentQuestion: 0,
            answers: [],
            nextDate: new Date()
        }
    };
    users[msg.from.id] = user;
    return user;
};

const sendMessage = (chatId, text, commands) => {
    if (!commands) {
        bot.sendMessage(chatId, text, {
            "reply_markup": {
                hide_keyboard: true
            },
            parse_mode: "HTML"
        });
    } else {
        bot.sendMessage(chatId, text, {
            "reply_markup": {
                "keyboard": commands
            },
            parse_mode: "HTML"
        });
    }
};

let generateReport = (userId) => {
    let report = '';
    //Object.keys(users).forEach(userId => {
    let user = users[userId];
    if (user.report && user.report.answers && user.report.answers.length > 0) {
        report = report + '<b>' + user.name + '</b>\n';
        user.report.answers.forEach(answer => {
            report = report + '<b>' + answer.number + ' ' + answer.question + '</b>\n';
            report = report + '<i>' + answer.asnwer + '</i>\n';
        })
    }
    //});
    return report;
};

let generateShortReport = (userId) => {
    let report = '';
    //Object.keys(users).forEach(userId => {
    let user = users[userId];
    if (user.report && user.report.answers && user.report.answers.length > 0) {
        report = report + '<b>' + user.name + '</b>\n';
        user.report.answers.forEach(answer => {
            if (answer.number !== 2 && answer.number !== 3 && answer.number !== 14) {
                report = report + '<b>' + answer.number + ' ' + answer.question + '</b>\n';
                report = report + '<i>' + answer.asnwer + '</i>\n';
            }
        })
    }
    //});
    return report;
};


let generateShortCorporateReport = (userId) => {
    let report = '';
    let user = users[userId];
    if (user.report && user.report.answers && user.report.answers.length > 0) {
        report = report + '<b>' + user.name + '</b>\n';
        user.report.answers.forEach(answer => {
            if (answer.question === 'Напиши важную мысль за день (отчёт корп. Самураев):\n') {
                report = report + '<i>' + answer.asnwer + '</i>\n';
            }
        })
    }
    return report;
};


let proccessMessage = (msg) => {


    let user = getUser(msg);
    let currentState = getNewState(user.currentState);
    const text = msg.text;
    saveUsers();

    let reportCommand = 'Отчет';
    if (text === reportCommand) {
        //sendMessage(user.chatId, generateReport());
        sendMessage(variables.reportsChatId, generateReport(user.id));
        return;
    }

    if (currentState.state === 'new') {
        currentState.toRole();
        user.currentState = currentState.state;
        sendMessage(user.chatId, "Привет, " + msg.from.first_name);
    }
    if (currentState.state === 'role') {
        currentState.toWaitForRole();
        user.currentState = currentState.state;
        sendMessage(user.chatId, "Выбери свою роль в компании", roles.map(item => [item]));
    }
    if (currentState.state === 'waitForRole') {
        if (text) {
            if (roles.indexOf(text) > -1) {
                user.role = text;
                currentState.toWaitForReport();
                user.currentState = currentState.state;
                sendMessage(user.chatId, "Вы выбрали роль " + text);
            }
        }
    }
    let fillInReport = '🔤 Заполнить отчет';
    let later = '🕐 Позже';
    let fillReportCommands = [fillInReport, later, reportCommand];
    if (currentState.state === 'waitForReport') {


        if (text === fillInReport) {
            currentState.toFillReport();
            user.currentState = currentState.state;
        } else if (text === later) {
            let now = new Date();
            user.report.nextDate = now.setMinutes(now.getMinutes() + 3);
        } else {
            sendMessage(user.chatId, "Хотите заполнить отчет сейчас?", [fillReportCommands]);
        }
    }
    if (currentState.state === 'fillReport') {
        if (text === 'Меню') {
            currentState.toWaitForReport();
            user.currentState = currentState.state;
            user.report.currentQuestion = 0;
            sendMessage(user.chatId, 'Не забудьте заполнить отчет!', [fillReportCommands]);
            return;
        }

        if (user.report.currentQuestion > 0) {
            let prevQuestion = questionsProvider.getQuestionByRole(user.role, user.report.currentQuestion);
            user.report.answers.push({
                question: prevQuestion.question,
                number: user.report.currentQuestion,
                asnwer: text
            });
            user.report.currentQuestion = prevQuestion.next(text);
        } else {
            user.report.answers = [];
            user.report.date = new Date();
            user.report.currentQuestion++;
        }
        let question = questionsProvider.getQuestionByRole(user.role, user.report.currentQuestion);
        if (!question.question) {
            currentState.toWaitForReport();
            user.currentState = currentState.state;
            user.report.currentQuestion = 0;
            sendMessage(user.chatId, 'Спасибо что заполнили отчет!', [['Меню']]);
            sendMessage(variables.corporateSamuraiChatId, generateShortCorporateReport(user.id));
            sendMessage(variables.shortReportsChatId, generateShortReport(user.id));
        } else {
            if (question.type === 'text') {
                //sendMessage(user.chatId, question.question, [['Меню']]);
                sendMessage(user.chatId, question.question, null);
            }
            if (question.type === 'yesno') {
                //sendMessage(user.chatId, question.question, [['Да', 'Нет'], ['Меню']]);
                sendMessage(user.chatId, question.question, [[YES, NO]]);
            }
        }

    }

};

setInterval(() => {
    let now = new Date();
    Object.keys(users).forEach(userId => {
        let user = users[userId];

        let minutes = new Date(new Date().getTime() - (new Date(user.lastActivityDate)).getTime()).getMinutes();
        if (minutes > 10 && user.report.nextDate > now) {
            let fillInReport = 'Заполнить отчет';
            let later = 'Позже';
            let commands = [fillInReport, later];
            sendMessage(user.chatId, "Хотите заполнить отчет сейчас?", [commands]);
        }
    })
}, 1000 * 30);

loadUsers();

bot.on('message', proccessMessage);

