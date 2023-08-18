'use client';

import { toast } from "react-hot-toast";

import { SafeResertion, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "@/app/components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import ListingCard from "@/app/components/listings/ListingCard";


interface ReservationClientProps {
    reservations : SafeResertion[];
    currentUser?: SafeUser | null;
}

const ReservationClient:React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("취소되었습니다.")
            router.refresh();
        })
        .catch((error:any)=>{
            toast.error('취소에 실패하였습니다.')
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router])

    return ( 
        <Container>
            <Heading 
                title="예약리스트"
                subtitle="예약된 리스트 입니다."
            />    
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
            {reservations.map((reservation: any) => (
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disalbed={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
            />
            ))}
            
            
            </div>        
        </Container>
     );
}
 
export default ReservationClient;