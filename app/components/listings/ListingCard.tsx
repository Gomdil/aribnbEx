'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeResertion, SafeUser, safeListings } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingProps {
   data : safeListings;
   reservation?:SafeResertion;
   onAction?:(id:string)  => void;
   disalbed?: boolean
   actionLabel?: string;
   actionId? : string ;
   currentUser?: SafeUser | null;
}

const ListingCard:React.FC<ListingProps> = ({
    data,
    reservation,
    onAction,
    disalbed,
    actionId = "",
    actionLabel,
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handelCancel = useCallback(
        (e:React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disalbed){
                return;
            }

            onAction?.(actionId);
        } , [onAction, actionId , disalbed]
    );

    const price = useMemo(()=>{
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price
    },[reservation , data.price])

    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;

        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start,'pp')} - ${format(end,'PP')}`
    },[reservation])

    return ( 
        <div 
            onClick={()=>router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl

                ">
                    <Image
                        alt="listing"
                        src={data.imageSrc}
                        fill
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>                    
                </div>
                <div className="font-semibold text-lg">
                    {location?.region},{location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center , gap-1">
                   
                    <div className="font-semibold">
                         {price} 원
                    </div>
                    
                    {!reservation && (
                        <div className="font-light">1박기준</div>
                    )}
                    
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disalbed}
                        small
                        label={actionLabel}
                        onClick={handelCancel}
                    />
                )}
            </div>
        </div>

     );
}
 
export default ListingCard;