'use client'

import Container from "../Container";

import {BsSnow} from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import {TbBeach,TbMountain, TbPool} from 'react-icons/tb'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {FaSkiing} from 'react-icons/fa'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label:'Beach',
        icon:TbBeach,
        desscription: 'This property is close to the beach!'
    },
    {
        label:'WindMills',
        icon:GiWindmill,
        desscription: 'This property has windmill!'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        desscription: 'This property is Modern!'
    }
    ,
    {
        label:'Countryside',
        icon:TbMountain,
        desscription: 'This property is on the Countryside!'
    }
    ,
    {
        label:'Pools',
        icon:TbPool,
        desscription: 'This property has a Pools!'
    }
    ,
    {
        label:'IsLands',
        icon:GiIsland,
        desscription: 'This property is on an  isLands!'
    }
    ,
    {
        label:'Lake',
        icon:GiBoatFishing,
        desscription: 'This property is close to a lake!'
    }
    ,
    {
        label:'Skiing',
        icon:FaSkiing,
        desscription: 'This property has skiing activities!'
    }
    ,
    {
        label:'Castles',
        icon:GiCastle,
        desscription: 'This property is in a castles!'
    }
    ,
    {
        label:'Camping',
        icon:GiForestCamp,
        desscription: 'This property has camping!'
    }
    ,
    {
        label:'Arctic',
        icon:BsSnow,
        desscription: 'This property has camping!'
    }
    ,
    {
        label:'Cave',
        icon:GiCaveEntrance,
        desscription: 'This property in a cave!'
    }
    ,
    {
        label:'Desert',
        icon:GiCactus,
        desscription: 'This property is in the desert'
    }
    ,
    {
        label:'Barns',
        icon:GiBarn,
        desscription: 'This property is in the barn!'
    }
    ,
    {
        label:'Lux',
        icon:IoDiamond,
        desscription: 'This property is in the luxurious!'
    }
    
]


const Categories = () => {

    const params = useSearchParams();
    const catetory = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage){
        return null;
    }

    return ( 
        <Container>
            <div 
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={catetory === item.label}
                        icon={item.icon} 
                        desscription={""}                    />
                ))}
            </div>
        </Container>
     );
}
 
export default Categories;
