export class ChristmasQueue<T> {
    private queue: {
        priority: number;
        envelopes: T[];
    }[] = [];

    sort() {
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    getHighestPriority() {
        return this.queue.reduce((maxPriority, obj) => {
            return obj.priority > maxPriority ? obj.priority : maxPriority;
        }, -Infinity);
    }
    enqueue = (envelope: T, priority: number) => {
        const exitsItem = this.queue.find((obj) => obj?.priority === priority);

        if (!exitsItem) {
            const newItem = {
                priority,
                envelopes: [envelope],
            };

            this.queue.push(newItem);
        } else {
            exitsItem.envelopes.push(envelope);
        }

        this.sort();
    };

    dequeue = () => {
        if (!this.queue.length) {
            throw new Error("There are no letters in the queue!");
        }

        const highestPrioritate = this.getHighestPriority();

        const exitsItem = this.queue.find((obj) => obj?.priority === highestPrioritate);

        let result;

        if (exitsItem && exitsItem.envelopes.length >= 1) {
            result = exitsItem.envelopes.shift();
        }

        if (exitsItem && !exitsItem.envelopes.length) {
            this.queue.shift();
        }

        return result;
    };

    isEmpty = () => {
        if (this.queue.length) {
            return false;
        }

        return true;
    };
}
