const Question = require('./Question');

class SaleQuestion1 extends Question {
    constructor() {
        super();
        this.question = 'Сколько минут ты сегодня выговорил?\n'
    }

    next(answer) {
        return answer < 120 ? 2 : 3;
    }
}

class SaleQuestion2 extends Question {
    constructor() {
        super();
        this.question = 'Что тебе помешало выговорить 2 часа, чтобы мы могли понять чем тебе помочь?\n';
    }

    next(answer) {
        return 3;
    }
}

class SaleQuestion3 extends Question {
    constructor() {
        super();
        this.question = 'Какую выручку ты сделал сегодня?\n'
    }

    next(answer) {
        return 4;
    }
}

class SaleQuestion4 extends Question {
    constructor() {
        super();
        this.question = 'Записал сегодня аффирмации в чат?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 5;
    }
}

class SaleQuestion5 extends Question {
    constructor() {
        super();
        this.question = 'Участвовал ли в тренеровке маркетологов?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 6;
    }
}

class SaleQuestion6 extends Question {
    constructor() {
        super();
        this.question = 'Участвовал ли в утренней разгонке?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 7;
    }
}

class SaleQuestion7 extends Question {
    constructor() {
        super();
        this.question = 'Выполнил сегодня свою «Одну вещь»?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 8;
    }
}

class SaleQuestion8 extends Question {
    constructor() {
        super();
        this.question = 'Написал сегодня ежедневный отчет?\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 9;
    }
}

class SaleQuestion9 extends Question {
    constructor() {
        super();
        this.question = 'Напиши важную мысль за день (отчёт корп. Самураев):\n'
    }

    next(answer) {
        return 10;
    }
}

class SaleQuestion10 extends Question {
    constructor() {
        super();
        this.question = 'Сколько 2-х часовых отчетов ты написал сегодня?\n'
    }

    next(answer) {
        return 11;
    }
}

class SaleQuestion11 extends Question {
    constructor() {
        super();
        this.question = 'Писал ли ты благодарность в чат благодарностей? (Если нет, то ты можешь сделать это сейчас >*ссылка на чат*>)\n'
        this.type = 'yesno';
    }

    next(answer) {
        return 12;
    }
}

class SaleQuestion12 extends Question {
    constructor() {
        super();
        this.question = 'Пополнял ли ты сегодня базу знаний?\n';
        this.type = 'yesno';
    }

    next(answer) {
        return 13;
    }
}

class SaleQuestion13 extends Question {
    constructor() {
        super();
        this.question = 'Что ещё важного ты сегодня сделал (можно писать словами фразами в столбик)?\n'
    }

    next(answer) {
        return 0;
    }
}

class SaleQuestionsFactory {
    getQuestion(number) {
        switch (number) {
            case 1: {
                return new SaleQuestion1();
            }
            case 2: {
                return new SaleQuestion2();
            }
            case 3: {
                return new SaleQuestion3();
            }
            case 4: {
                return new SaleQuestion4();
            }
            case 5: {
                return new SaleQuestion5();
            }
            case 6: {
                return new SaleQuestion6();
            }
            case 7: {
                return new SaleQuestion7();
            }
            case 8: {
                return new SaleQuestion8();
            }
            case 9: {
                return new SaleQuestion9();
            }
            case 10: {
                return new SaleQuestion10();
            }
            case 11: {
                return new SaleQuestion11();
            }
            case 12: {
                return new SaleQuestion12();
            }
            case 13: {
                return new SaleQuestion13();
            }
            default:
                return new Question();
        }
    }
}

module.exports = SaleQuestionsFactory;