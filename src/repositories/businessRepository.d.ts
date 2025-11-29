export declare class BusinessRepository {
    createBasicInfo(data: {
        ownerId: string;
        name: string;
        phone?: string;
        segment?: string;
    }): Promise<{
        number: string | null;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        segment: string | null;
        street: string | null;
        neighborhood: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        onboardingStep: number;
        ownerId: string;
    }>;
    findById(id: string): Promise<{
        number: string | null;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        segment: string | null;
        street: string | null;
        neighborhood: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        onboardingStep: number;
        ownerId: string;
    } | null>;
    updateLocation(data: {
        businessId: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    }): Promise<{
        number: string | null;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        segment: string | null;
        street: string | null;
        neighborhood: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        onboardingStep: number;
        ownerId: string;
    }>;
    finishStep1(businessId: string): Promise<{
        number: string | null;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        segment: string | null;
        street: string | null;
        neighborhood: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        onboardingStep: number;
        ownerId: string;
    }>;
}
export declare const businessRepository: BusinessRepository;
//# sourceMappingURL=businessRepository.d.ts.map