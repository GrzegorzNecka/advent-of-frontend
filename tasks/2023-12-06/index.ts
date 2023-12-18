export class OrderController {
    private machines: Machine[];

    constructor() {
        this.machines = [];
    }

    registerMachine = (machine: Machine) => {
        this.machines.push(machine);
    };

    unregisterMachine = (machine: Machine) => {
        const index = this.machines.findIndex((m) => m === machine);

        if (index !== -1) {
            this.machines.splice(index, 1);
        }
    };

    setState = (state: string) => {
        if (state === "unknown") {
            throw Error("Invalid state provided");
        }
        this.machines.forEach((machine) => {
            machine.state = state;
        });
    };
}

export class Machine {
    _state: string | null;
    private states: string[];

    constructor() {
        this._state = null;
        this.states = [];
    }

    get state() {
        return this._state;
    }

    set state(state: string | null) {
        this._state = state;

        if (state) {
            this.states.push(state);
        }
    }

    performAudit = () => {
        return this.states.map((state, i) => {
            return `Order #${i + 1} - ${state}`;
        });
    };
}
