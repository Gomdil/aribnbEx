'use client';

import Image from "next/image";

interface AvaterProps{
    src: string | null | undefined;
}

const Avatar: React.FC<AvaterProps> = ({
    src
}) => {
    return ( 
        <Image
            className="rounded-full" 
            src={src || "/images/placeholder.jpg"}
            alt="Avatar"        
            height="30"
            width="30"
        />        
     );
}
 
export default Avatar;