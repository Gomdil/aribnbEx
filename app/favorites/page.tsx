import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import getFavoriteListings from "../action/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currnetUser = await getCurrentUser();

    if (listings.length === 0){
        return ( 
            <ClientOnly>
                <EmptyState
                    title="즐겨찾기가 없습니다."
                    subtitle="관심있는 숙소를 즐겨찾기 해주시길 바랍니다."
                />
            </ClientOnly>
        );
    }

    return(
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currnetUser}
            />
        </ClientOnly>
    )


}
 
export default ListingPage;