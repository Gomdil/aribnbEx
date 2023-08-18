import EmptyState  from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./propertiesClient";


import getCurrentUser from "../action/getCurrentUser";
import getReservations from "../action/getReservations";
import getListings from "../action/getListings";



const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
           <ClientOnly>
                <EmptyState
                    title="Unauthoriszed"
                    subtitle="Please login"
                />
           </ClientOnly> 
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length === 0 ){
        return(
           <ClientOnly>
                <EmptyState
                    title="등록한 상품이 없습니다."
                    subtitle="상품을 등록해주세요."
                />
            </ClientOnly>  
        )
    }

    return(
        <ClientOnly>
          <PropertiesClient
            listings={listings}
            currentUser={currentUser}
          />

        </ClientOnly>  
    )
}
 
export default PropertiesPage;