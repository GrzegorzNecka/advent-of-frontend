// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`

/* 
    Święty Mikołaj ma problem. Jego renifery zauważyły,
    że listy od dzieci z całego świata nie są odpowiednio sortowane. 
    Listy powinny być uporządkowane według priorytetu, który jest wyrażony liczbą -
    im wyższa liczba, tym wyższy priorytet. Mikołaj potrzebuje systemu,
    który pomoże mu szybko i efektywnie organizować listy, 
    aby żadne życzenie nie zostało pominięte. Renifery są ekspertami od logistyki, 
    a nie od struktur danych, więc Mikołaj zwraca się o pomoc do programistów. 
    Czy jesteś w stanie stworzyć dla niego odpowiednią strukturę danych,
    która pomoże mu w sortowaniu listów? Czas ucieka!
*/

import { ChristmasQueue } from "./index";

describe("ChristmasQueue", () => {
    test("should enqueue and dequeue items based on priority", () => {
        const pq = new ChristmasQueue<string>();

        pq.enqueue("lowPriority", 1);
        pq.enqueue("highPriority", 3);
        pq.enqueue("mediumPriority", 2);
        pq.enqueue("highPriority", 3);
        pq.enqueue("lowPriority", 1);

        expect(pq.dequeue()).toBe("highPriority");
        expect(pq.dequeue()).toBe("highPriority");
        expect(pq.dequeue()).toBe("mediumPriority");
        expect(pq.dequeue()).toBe("lowPriority");
        expect(pq.dequeue()).toBe("lowPriority");

        expect(pq.isEmpty()).toBe(true);
    });

    test("should handle same priority items in FIFO order", () => {
        const pq = new ChristmasQueue<string>();
        pq.enqueue("firstIn", 2);
        pq.enqueue("secondIn", 2);
        pq.enqueue("thirdIn", 2);

        expect(pq.dequeue()).toBe("firstIn");
        expect(pq.dequeue()).toBe("secondIn");
        expect(pq.dequeue()).toBe("thirdIn");
    });

    test("should support complex types", () => {
        const pq = new ChristmasQueue<{ giftName: string }>();
        pq.enqueue({ giftName: "game console" }, 1);
        pq.enqueue({ giftName: "snowboard" }, 2);
        pq.enqueue({ giftName: "christmas balls" }, 3);

        expect(pq.dequeue()).toStrictEqual({ giftName: "christmas balls" });
        expect(pq.dequeue()).toStrictEqual({ giftName: "snowboard" });
        expect(pq.dequeue()).toStrictEqual({ giftName: "game console" });
    });

    test("should throw an error when dequeueing from an empty queue", () => {
        const pq = new ChristmasQueue<string>();
        expect(pq.isEmpty()).toBe(true);
        expect(() => pq.dequeue()).toThrow("There are no letters in the queue!");
    });
});
