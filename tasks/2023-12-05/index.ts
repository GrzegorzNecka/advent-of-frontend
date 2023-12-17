// type EventPayload = {
//     message: string;
// };

type Listener = () => void;
type Listeners = {
    [eventName: string]: Listener[];
};

export class ChristmasEmitter {
    private listeners: Listeners = {};

    on = (eventName: string, listener: () => void) => {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(listener);
    };

    off = (eventName: string, listener: () => void) => {
        if (!this.listeners[eventName]) {
            return;
        }

        delete this.listeners[eventName];
    };

    emit = (eventName: string) => {
        if (!this.listeners[eventName]) {
            return;
        }

        const listeners = this.listeners[eventName];

        listeners.forEach((listener) => {
            listener();
        });
    };
}
