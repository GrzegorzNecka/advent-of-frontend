type BetterParameters<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown ? P : never;
type BetterReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer R
    ? R
    : unknown;

export function memoize<T extends (...args: unknown[]) => BetterReturnType<T>>(calculation: T) {
    const memo: Map<string, BetterReturnType<T>> = new Map();

    if (typeof calculation !== "function") {
        throw new Error("Function to be memoized must be a function.");
    }

    return function (...args: BetterParameters<T>): BetterReturnType<T> | undefined {
        const key = JSON.stringify(args);

        if (!memo.has(key)) {
            memo.set(key, calculation(...args));
        }

        return memo.get(key);
    };
}
