export class User {
  constructor(
    public readonly id: number | undefined,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public cpf: string,
    public profileImage?: string | null,
    public description?: string | null,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
    public linkedin?: string | null,
    public github?: string | null,
    public website?: string | null,
    public currentLoginStreak?: number | null,
    public maxLoginStreak?: number | null,
    public lastLogin?: Date | null,
    public subscriptionPlan: 'FREE' | 'GOLD' | 'PLATINUM' = 'FREE',
    public subscriptionValidUntil?: Date | null,
  ) {}
}
