import { PrismaService } from '../../../../prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
export declare class PrismaUserRepository implements IUserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}
