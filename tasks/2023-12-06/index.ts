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
    }

    performAudit = () => {};
}
