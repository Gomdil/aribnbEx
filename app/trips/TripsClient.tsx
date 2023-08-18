'use client';

import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeResertion, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { read } from "fs";

interface TripsClientProps {
    reservations : SafeResertion[],
    currentUser?: SafeUser |null
}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deleteingId , setDeleteingID] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeleteingID(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('예약이 취소되었습니다.')
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeleteingID('');
        })
    },[router]);

    return ( 
       <Container>
            <Heading
                title="Trips"
                subtitle="Where your been and where you going "
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {reservations.map((reservation)=>(
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        actionLabel="예약 취소"
                        disalbed={deleteingId === reservation.id}
                        currentUser={currentUser}

                    />
                ))}                
            </div>
       </Container>
     );
}
 
export default TripsClient;