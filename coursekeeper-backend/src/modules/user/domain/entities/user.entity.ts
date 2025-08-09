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
  ) {}
}
