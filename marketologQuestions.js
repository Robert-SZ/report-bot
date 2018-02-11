const variables = require('./variables.json');
const Question = require('./Question');


class MarketologQuestion1 extends Question {
    constructor() {
        super();
        this.question = 'Сколько объявлений ты сегодня сделал по своему проекту?\n'
    }

    next(answer) {
        return 2;
    }
}

class MarketologQuestion2 extends Question {
    constructor() {
        super();
        this.question = 'Проект идёт в плане по заявкам?\n';
        this.type = 'yesno';
    }

    next(answer) {
        return answer === variables.YES ? 4 : 3;
    }
}

class MarketologQuestion3 extends Question {
    constructor() {
        super();
        this.question = 'Почему проект не плане и что ты намерен сделать для этого?\n'
    }

    next(answer) {
        return 4;
    }
}

class MarketologQuestion4 extends Question {
    constructor() {
        super();
        this.question = 'Сколько заявок ты привлек сегодня?\n'
    }

    next(answer) {
        return 5;
    }
}

class MarketologQuestion5 extends Question {
    constructor() {
        super();
        this.question = 'Средняя стоимость заявки за день в ВК?\n'
    }

    next(answer) {
        return 6;
    }
}

class MarketologQuestion6 extends Question {
    constructor() {
        super();
        this.question = 'Средняя стоимость заявки за день в ФБ?\n'
    }

    next(answer) {
        return 7;
    }
}

class MarketologQuestion7 extends Question {
    constructor() {
        super();
        this.question = 'Средняя стоимость заявки за день в ЯД?\n'
    }

    next(answer) {
        return 8;
    }
}

class MarketologQuestion8 extends Question {
    constructor() {
        super();
        this.question = 'Средняя стоимость заявки за день в GA?\n'
    }

    next(answer) {
        return 9;
    }
}

class MarketologQuestion9 extends Question {
    constructor() {
        super();
        this.question = 'Записал сегодня аффирмации в чат?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 10;
    }
}

class MarketologQuestion10 extends Question {
    constructor() {
        super();
        this.question = 'Участвовал ли в тренеровке маркетологов?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 11;
    }
}

class MarketologQuestion11 extends Question {
    constructor() {
        super();
        this.question = 'Участвовал ли в утренней разгонке?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 12;
    }
}

class MarketologQuestion12 extends Question {
    constructor() {
        super();
        this.question = 'Выполнил сегодня свою «Одну вещь»?\n';
        this.type = 'yesno';
    }

    next(answer) {
        return 13;
    }
}

class MarketologQuestion13 extends Question {
    constructor() {
        super();
        this.question = 'Написал сегодня ежедневный отчет?\n';
        this.type = 'yesno';
    }

    next(answer) {
        return 14;
    }
}

class MarketologQuestion14 extends Question {
    constructor(bot) {
        super();
        this.bot = bot;
        this.question = 'Напиши важную мысль за день (отчёт корп. Самураев):\n'
    }

    next(answer) {
        //this.bot.sendMessage(variables.corporateSamuraiChatId, answer);
        return 15;
    }
}

class MarketologQuestion15 extends Question {
    constructor() {
        super();
        this.question = 'Сколько 2-х часовых отчетов ты написал сегодня?\n'
    }

    next(answer) {
        return 16;
    }
}

class MarketologQuestion16 extends Question {
    constructor() {
        super();
        this.question = 'Писал ли ты благодарность в чат благодарностей? (Если нет, то ты можешь сделать это сейчас https://t.me/joinchat/BE-8WQ-8ev256gOzUNmnzg)\n';
        this.type = 'yesno';
    }

    next(answer) {
        return 17;
    }
}

class MarketologQuestion17 extends Question {
    constructor() {
        super();
        this.question = 'Пополнял ли ты сегодня базу знаний?\n';
        this.type = 'yesno';
    }

    next(answer) {
        return 18;
    }
}

class MarketologQuestion18 extends Question {
    constructor() {
        super();
        this.question = 'Что ещё важного ты сегодня сделал (можно писать словами фразами в столбик)?\n'
    }

    next(answer) {
        return 0;
    }
}

class MarketologQuestionsFactory {
    constructor(bot) {
        this.bot = bot;
    }

    getQuestion(number) {
        switch (number) {
            case 1: {
                return new MarketologQuestion1();
            }
            case 2: {
                return new MarketologQuestion2();
            }
            case 3: {
                return new MarketologQuestion3();
            }
            case 4: {
                return new MarketologQuestion4();
            }
            case 5: {
                return new MarketologQuestion5();
            }
            case 6: {
                return new MarketologQuestion6();
            }
            case 7: {
                return new MarketologQuestion7();
            }
            case 8: {
                return new MarketologQuestion8();
            }
            case 9: {
                return new MarketologQuestion9();
            }
            case 10: {
                return new MarketologQuestion10();
            }
            case 11: {
                return new MarketologQuestion11();
            }
            case 12: {
                return new MarketologQuestion12();
            }
            case 13: {
                return new MarketologQuestion13();
            }
            case 14: {
                return new MarketologQuestion14(this.bot);
            }
            case 15: {
                return new MarketologQuestion15();
            }
            case 16: {
                return new MarketologQuestion16();
            }
            case 17: {
                return new MarketologQuestion17();
            }
            case 18: {
                return new MarketologQuestion18();
            }
            default:
                return new Question();
        }
    }
}

module.exports = MarketologQuestionsFactory;