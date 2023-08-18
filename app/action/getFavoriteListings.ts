import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
    try{
        const currentuser = await getCurrentUser();

        if (!currentuser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where : {
                id:{
                    in:[...(currentuser.favoriteIds || [])]
                }
            }
        })

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createAt:favorite.createAt.toISOString()
        }));

        return safeFavorites;

    } catch (err:any) {
       throw new Error(err);
    }
}
