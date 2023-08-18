import prisma from '@/app/libs/prismadb';
import { error } from 'console';

interface IParams {
    listingId?: string;
    userId?:string;
    authorId?:string;
}

export default async function getReservations(
    params:IParams
) {
    try {
        const { listingId, userId , authorId} = params;

        const query: any = {};

        if(listingId){
            query.listingId = listingId;
        }

        if(userId){
            query.userId = userId;
        }

        if (authorId){
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where : query,
            include:{
                listing:true
            },
            orderBy:{
                createAt : 'desc'
            }        
        });

        const safeReservations = reservations.map(
            (reservations) => ({
                ...reservations,
                createdAt : reservations.createAt.toISOString(),
                startDate : reservations.startDate.toISOString(),
                endDate : reservations.endDate.toISOString(),
                listing : {
                    ...reservations.listing,
                    createdAt:reservations.createAt.toISOString()
                }

            })
        )

        return safeReservations;
    } catch  (error:any){
        throw new Error(error);
    }
    
}