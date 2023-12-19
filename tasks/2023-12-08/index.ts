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

    sortLetters(letters: Letter[]): Letter[] {
        return this.strategy.sort(letters);
    }
}

export class PriorityStrategy {
    #order: Letter["priority"][];
    constructor() {
        this.#order = ["high", "medium", "low"];
    }

    sort = (letters: Letter[]) => {
        return letters.sort((a, b) => this.#order.indexOf(a.priority) - this.#order.indexOf(b.priority));
    };
}

export class CountryStrategy {
    #order: Letter["country"][];
    constructor() {
        this.#order = ["pl", "de", "us"];
    }

    sort = (letters: Letter[]) => {
        return letters.sort((a, b) => this.#order.indexOf(a.country) - this.#order.indexOf(b.country));
    };
}

export class LengthStrategy {
    sort = (letters: Letter[]) => {
        return letters.sort((a, b) => a.content.length - b.content.length);
    };
}
