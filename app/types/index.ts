import { Listing, Reservation, User } from "@prisma/client";


export type safeListings = Omit<
    Listing,
    "createdAt" | "createAt"
> & {
    createdAt : string;
    createAt : string;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" | "createAt" | "updateAt"
> & {
    createdAt : string;
    updatedAt: string ;
    emailVerified: string | null;
    createAt : string ;
    updateAt : string ;
    
};


export type SafeResertion = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing" | "createAt"
> & {
    createdAt : string;
    startDate : string;
    endDate : string;
    listing : safeListings;
    createAt : string ;
}
