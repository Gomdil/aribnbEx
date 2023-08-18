import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from "../action/getReservations";
import getCurrentUser from "../action/getCurrentUser";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async () => {
    const currentUser  = await getCurrentUser();

    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title="로그인일 필요한 페이지 입니다."
                    subtitle="로그인을 해주세요.!"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length===0){
        return(
            <ClientOnly>
                <EmptyState
                    title="예약된 주문이 없습니다."
                    subtitle="먼저 숙소를 찾아 예약해 주세요"
                />
            </ClientOnly>
        )
    }

    return (
     <ClientOnly>
        <ReservationClient
            reservations = {reservations}
            currentUser = {currentUser}
        />
    </ClientOnly>
    )



}

export default ReservationsPage;