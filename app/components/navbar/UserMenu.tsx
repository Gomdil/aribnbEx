'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avater from '../Avatar'
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from '@prisma/client'
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen , setIsOpen] = useState(false);

    const toggleOptn = useCallback(()=>{
        setIsOpen((value)=> !value);
    },[]);

    const onRent = useCallback(()=>{
        if (!currentUser){
            return loginModal.onOpen();
        }

        // open rent Model
        rentModal.onOpen();
    },[currentUser,loginModal,rentModal])

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    gomdil home
                </div>
                <div
                    onClick={toggleOptn}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                        items-center
                    "
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avater src={currentUser?.image}/>
                    </div>
                </div>

            </div>
            {
                isOpen && (
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-md
                            w-[40vw]
                            md:w-3/4
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            text-sm
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                            {currentUser ? (
                                <>
                                    <MenuItem 
                                        onClick={()=>{router.push("/trips")}} 
                                        label="나의 여행"
                                    />
                                     <MenuItem 
                                        onClick={()=> router.push("/favorites") } 
                                        label="즐겨찾기"
                                    />
                                     <MenuItem 
                                        onClick={()=>{router.push("/reservations")}} 
                                        label="나의 구매"
                                    />
                                     <MenuItem 
                                        onClick={()=>router.push("/properties")} 
                                        label="나의등록상품"
                                    />
                                     <MenuItem 
                                        onClick={rentModal.onOpen} 
                                        label="상품등록"
                                    />
                                    <hr/>
                                    <MenuItem 
                                        onClick={()=>{signOut()}} 
                                        label="로그아웃"
                                    />
                                </>
                            ):(
                                <>
                                    <MenuItem 
                                        onClick={loginModal.onOpen} 
                                        label="Login"
                                    />
                                    <MenuItem 
                                        onClick={registerModal.onOpen} 
                                        label="Sign up"
                                    />
                                </>
                            )}
                        </div>

                    </div>
                )
            }

        </div>
     );
}
export default UserMenu ;