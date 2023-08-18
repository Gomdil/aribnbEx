import EmptyState  from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";


import getCurrentUser from "../action/getCurrentUser";
import getReservations from "../action/getReservations";



const TripPage = async () => {
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

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if(reservations.length === 0 ){
        return(
           <ClientOnly>
                <EmptyState
                    title="No trip found"
                    subtitle="Look like you havent resered any trips!"
                />
            </ClientOnly>  
        )
    }

    return(
        <ClientOnly>
          <TripsClient
            reservations={reservations}
            currentUser={currentUser}
          />

        </ClientOnly>  
    )
}
 
export default TripPage;