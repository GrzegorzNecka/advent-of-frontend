export interface Letter {
    content: string;
    country: "pl" | "de" | "us";
    priority: "high" | "medium" | "low";
}

type Strategy = PriorityStrategy | CountryStrategy | LengthStrategy;

export class LetterSorter {
    strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    sortLetters = (letters: Letter[]) => this.strategy.sort(letters);
}

//----------------------------------------

abstract class BaseStrategy<T> {
    order: T[];

    constructor(order: T[]) {
        this.order = order;
    }

    abstract getKey(letters: Letter): T;

    sort = (letters: Letter[]) =>
        letters.sort((a, b) => {
            const keyA = this.order.indexOf(this.getKey(a));
            const keyB = this.order.indexOf(this.getKey(b));

            return keyA - keyB;
        });
}

// ----------------------------

export class PriorityStrategy extends BaseStrategy<Letter["priority"]> {
    constructor() {
        super(["high", "medium", "low"]);
    }

    getKey = (letters: Letter) => letters.priority;
}

export class CountryStrategy extends BaseStrategy<Letter["country"]> {
    constructor() {
        super(["pl", "de", "us"]);
    }

    getKey = (letters: Letter) => letters.country;
}

export class LengthStrategy {
    sort = (letters: Letter[]) => letters.sort((a, b) => a.content.length - b.content.length);
}
