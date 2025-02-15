declare global {
    interface Profile {
        _id: string;
        profileInfo: {
            firstName: string;
            lastName: string;
            birthDate: string;
            email: string;
        };
        cycleStatus: {
            isRegistrationComplete: boolean;
            inOnboardingCompleted: boolean;
        };
    }

    interface MenstruationDay {
        date: string;
        type?: "BLEEDING" | "FERTILITY" | "OVULATION";
        note?: string;
    }

    interface Insights {
        _id: string;
        title: string;
        content: string;
    }

    interface UserState {
        token: string | null;
        profile: Profile | null;
        menstruationDays: MenstruationDay[];
        insights: Insights[];
        loading: boolean;
    }
}

export {};