import { Listing, Reservation, User } from "@prisma/client";


export type safeListings = Omit<
    Listing,
    "createAt"
> & {
    createAt : string
}

export type SafeUser = Omit<
    User,
    "createAt" | "updateAt" | "emailVerified"
> & {
    createAt : string;
    updateAt: string ;
    emailVerified: string | null
};


export type SafeResertion = Omit<
    Reservation,
    "createAt" | "startDate" | "endDate" | "listing"
> & {
    createAt : string;
    startDate : string;
    endDate : string;
    listing : safeListings
}
