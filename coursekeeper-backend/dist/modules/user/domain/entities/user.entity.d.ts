export declare class User {
    readonly id: number | undefined;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cpf: string;
    profileImage?: string | null | undefined;
    description?: string | null | undefined;
    readonly createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: (Date | null) | undefined;
    linkedin?: string | null | undefined;
    github?: string | null | undefined;
    website?: string | null | undefined;
    currentLoginStreak?: number | null | undefined;
    maxLoginStreak?: number | null | undefined;
    lastLogin?: (Date | null) | undefined;
    subscriptionPlan: 'FREE' | 'GOLD' | 'PLATINUM';
    subscriptionValidUntil?: (Date | null) | undefined;
    acceptedTermsAt?: (Date | null) | undefined;
    acceptedPrivacyAt?: (Date | null) | undefined;
    constructor(id: number | undefined, firstName: string, lastName: string, email: string, password: string, cpf: string, profileImage?: string | null | undefined, description?: string | null | undefined, createdAt?: Date | undefined, updatedAt?: Date | undefined, deletedAt?: (Date | null) | undefined, linkedin?: string | null | undefined, github?: string | null | undefined, website?: string | null | undefined, currentLoginStreak?: number | null | undefined, maxLoginStreak?: number | null | undefined, lastLogin?: (Date | null) | undefined, subscriptionPlan?: 'FREE' | 'GOLD' | 'PLATINUM', subscriptionValidUntil?: (Date | null) | undefined, acceptedTermsAt?: (Date | null) | undefined, acceptedPrivacyAt?: (Date | null) | undefined);
}
