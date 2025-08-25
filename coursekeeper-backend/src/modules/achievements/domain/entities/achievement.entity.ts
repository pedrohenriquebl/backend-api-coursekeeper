export class Achievement {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string,
    public readonly icon?: string,
    public readonly condition?: string | null,
  ) {}
}