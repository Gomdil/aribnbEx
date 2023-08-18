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
        description: 'This property is close to the beach!'
    },
    {
        label:'WindMills',
        icon:GiWindmill,
        description: 'This property has windmill!'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description: 'This property is Modern!'
    }
    ,
    {
        label:'Countryside',
        icon:TbMountain,
        description: 'This property is on the Countryside!'
    }
    ,
    {
        label:'Pools',
        icon:TbPool,
        description: 'This property has a Pools!'
    }
    ,
    {
        label:'IsLands',
        icon:GiIsland,
        description: 'This property is on an  isLands!'
    }
    ,
    {
        label:'Lake',
        icon:GiBoatFishing,
        description: 'This property is close to a lake!'
    }
    ,
    {
        label:'Skiing',
        icon:FaSkiing,
        description: 'This property has skiing activities!'
    }
    ,
    {
        label:'Castles',
        icon:GiCastle,
        description: 'This property is in a castles!'
    }
    ,
    {
        label:'Camping',
        icon:GiForestCamp,
        description: 'This property has camping!'
    }
    ,
    {
        label:'Arctic',
        icon:BsSnow,
        description: 'This property has camping!'
    }
    ,
    {
        label:'Cave',
        icon:GiCaveEntrance,
        description: 'This property in a cave!'
    }
    ,
    {
        label:'Desert',
        icon:GiCactus,
        description: 'This property is in the desert'
    }
    ,
    {
        label:'Barns',
        icon:GiBarn,
        description: 'This property is in the barn!'
    }
    ,
    {
        label:'Lux',
        icon:IoDiamond,
        description: 'This property is in the luxurious!'
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
                        description={""}                    />
                ))}
            </div>
        </Container>
     );
}
 
export default Categories;
