'use client';

import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, safeListings } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { read } from "fs";

interface PropoertisClientProps {
    listings : safeListings[],
    currentUser?: SafeUser |null
}

const PropertiesClient:React.FC<PropoertisClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter();
    const [deleteingId , setDeleteingID] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeleteingID(id);

        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listing deleted')
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
                title="Properties"
                subtitle="list of your properties "
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
                {listings.map((listing)=>(
                    <ListingCard
                        key={listing.id}
                        data={listing}                        
                        actionId={listing.id}
                        onAction={onCancel}
                        actionLabel="상품 삭제"
                        disalbed={deleteingId === listing.id}
                        currentUser={currentUser}

                    />
                ))}                
            </div>
       </Container>
     );
}
 
export default PropertiesClient;