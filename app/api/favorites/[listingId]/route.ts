import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from '@/app/libs/prismadb'
import { Pirata_One } from "next/font/google";


interface IParams {
    listingId?:string;
}

export async function POST(
    request: Request,
    { params } : {params : IParams}
){
    const curruentUser = await getCurrentUser();

    if (!curruentUser) {
        return NextResponse.error();
    }

    const {listingId} = params;

    if (!listingId || typeof listingId != 'string'){
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(curruentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where : {
            id:curruentUser.id
        },
        data : {
            favoriteIds
        }
    })

    return NextResponse.json(user);

}

export async function DELETE(
    request : Request,
    { params } : {params : IParams}
) {
    const curruentUser = await getCurrentUser();

    if (!curruentUser) {
        return NextResponse.error();        
    }

    const { listingId } = params;

    if (!listingId || typeof listingId != 'string'){
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(curruentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id)=> id != listingId);

    const user = await prisma.user.update({
        where : {
            id : curruentUser.id
        },
        data : {
            favoriteIds
        }
    })

    return NextResponse.json(user);
}