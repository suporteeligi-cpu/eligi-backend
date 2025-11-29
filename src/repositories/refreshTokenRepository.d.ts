export declare class RefreshTokenRepository {
    create(data: {
        userId: string;
        token: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        revoked: boolean;
        expiresAt: Date;
        userId: string;
    }>;
    findValid(token: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        revoked: boolean;
        expiresAt: Date;
        userId: string;
    } | null>;
    revoke(token: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        revoked: boolean;
        expiresAt: Date;
        userId: string;
    }>;
    revokeAllForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
export declare const refreshTokenRepository: RefreshTokenRepository;
//# sourceMappingURL=refreshTokenRepository.d.ts.map