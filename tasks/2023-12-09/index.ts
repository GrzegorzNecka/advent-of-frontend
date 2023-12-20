export interface Tool {
    init: () => void;
    update: () => void;
    dispose: () => void;
}

export class Equipment {
    tools: Tool[];
    initialize: boolean;

    constructor() {
        this.tools = [];
        this.initialize = false;
    }

    registerTools(tool: Tool) {
        this.tools.push(tool);
    }

    initializeTools() {
        this.tools.forEach((tool) => tool.init());
        this.initialize = true;
    }

    updateTools() {
        if (!this.initialize) {
            throw new Error("Cannot update any tools before initialization.");
        }

        this.tools.forEach((tool) => tool.update());
    }

    disposeTools() {
        this.tools.forEach((tool) => tool.dispose());
    }
}
