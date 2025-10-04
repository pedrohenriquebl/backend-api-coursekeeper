export declare class Achievement {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly description: string;
    readonly icon?: string | undefined;
    readonly condition?: string | null | undefined;
    constructor(id: number, code: string, name: string, description: string, icon?: string | undefined, condition?: string | null | undefined);
}
