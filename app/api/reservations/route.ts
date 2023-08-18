import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

import getCurrentUser from "@/app/action/getCurrentUser";

export async function POST(
    request:Request
) {
    const currentUSer = await getCurrentUser();

    if (!currentUSer){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingID,
        startDate,
        endDate,
        totalPrice
    } = body;

    if(!listingID || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where : {
            id : listingID
        },
        data:{
            reservations: {
                create : {
                    userId : currentUSer.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation);

}

