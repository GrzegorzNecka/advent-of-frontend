type Letter = { [key: string]: number };

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy

export function createTrackedLetter(target: Letter, changeTracker: (key: string, value: number) => void) {
    const handler = {
        set(target: Letter, key: string | symbol, value: any) {
            if (typeof key === "string") {
                changeTracker(key, value);
            }
            return true;
        },
    };

    return new Proxy(target, handler);
}
