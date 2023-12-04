type GiftData = {
    childId: number;
    gifts: string[];
};

type ChildId = GiftData["childId"];
type ChildGifts = GiftData["gifts"];
type Gift = string;

const isChild = (giftsData: GiftData[], id: ChildId) => {
    return giftsData.find((data) => data.childId === id);
};

const isGift = (gifts: ChildGifts, gift: Gift) => {
    return gifts.find((existGift: Gift) => existGift === gift);
};

export class GiftRegistry {
    #giftsData: GiftData[];

    constructor() {
        this.#giftsData = [];
    }

    addGift(childId: ChildId, gift: Gift) {
        const child = isChild(this.#giftsData, childId);

        if (!child) {
            this.#giftsData = [...this.#giftsData, { childId, gifts: [gift] }];
            return;
        }

        child.gifts = [...child.gifts, gift];
    }

    removeGift(childId: ChildId, gift: Gift) {
        const child = isChild(this.#giftsData, childId);

        if (!child) {
            throw new Error("Child not found");
        }

        const findingGift = isGift(child.gifts, gift);

        if (!findingGift) {
            throw new Error("Gift not found");
        }

        const updatedGifts = child.gifts.filter((existGift: Gift) => {
            if (existGift !== gift) {
                return existGift;
            }
        });

        child.gifts = [...updatedGifts];
    }

    getGiftsForChild(childId: ChildId) {
        const child = isChild(this.#giftsData, childId);

        if (!child) {
            throw new Error("Child not found");
        }

        return child.gifts;
    }
}
