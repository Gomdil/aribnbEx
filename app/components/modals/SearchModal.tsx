'use client';

import qs from 'query-string';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState , useMemo, useCallback} from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import { TbHealthRecognition } from 'react-icons/tb';
import Counter from '../inputs/Counter';


enum STEPS {
    LOCATION = 0 ,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {

    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location , setLocation] = useState<CountrySelectValue>();
    const [step , setStep] = useState(STEPS.LOCATION);
    const [guestCount , setGuestCount]  = useState(1);
    const [roomCount , setRoomCount ] = useState(1);
    const [bathRoomCount , setBathRoomCount] = useState(1);
    const [dateRange , setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key : 'selection'        
    })

    const Map = useMemo(()=> dynamic(()=> import('../Map'),{
        ssr : false,
    }),[location]);
   
    const onBack = useCallback(()=>{
        setStep((value)=>value - 1)
    },[])

    const onNext = useCallback(()=>{
        setStep((value)=>value+1)
    },[])

    const onSubmit = useCallback(async ()=>{
        if(step !== STEPS.INFO){
          return onNext(); 
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery : any = {
            ...currentQuery,
            locationValue : location?.value,
            guestCount,
            roomCount,
            bathRoomCount
        };

        if (dateRange.startDate ){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url : '/',
            query:updatedQuery
        },{skipNull:true})

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);

    },[
        step
        ,searchModal
        ,location
        ,router
        ,guestCount
        ,roomCount
        ,bathRoomCount
        ,dateRange
        ,onNext
        ,onBack
        ,params
    ]);


    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if (step === STEPS.LOCATION){
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='어디로 가길 원하니?'
                subtitle='갈곳을 정하라! '

            />

            <CountrySelect
                value={location}
                onChange={(value)=>
                    setLocation(value as CountrySelectValue)
                }
            />
            <hr/>

            <Map center={location?.latlng}
            />
        </div>
    )

    if (step === STEPS.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="언제 갈꺼니?"
                    subtitle='날짜를 정하라!'
                />

                <Calendar
                    value={dateRange}
                    onChange={(value)=> setDateRange(value.selection)}
                />

            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title = "추가정보"
                    subtitle='추가정보를 설정해라!'
                />
                <Counter
                    title="투숙인원"
                    subtitle='몇명이나 투숙할꺼니?'
                    value={guestCount}
                    onChange={(value)=> setGuestCount(value)}
                />
                <Counter
                    title="방은 몇개?"
                    subtitle='방은 몇개나 필요하나요?'
                    value={roomCount}
                    onChange={(value)=> setRoomCount(value)}
                />
                <Counter
                    title="화장실은 몇개"
                    subtitle='화장실은 몇개가 필요합니까?'
                    value={bathRoomCount}
                    onChange={(value)=> setBathRoomCount(value)}
                />
            </div>
        )
    }

    return ( 
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="필터스"
            actionLabel={actionLabel}
            secondaryAction={step===STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={step===STEPS.LOCATION ? undefined : secondaryActionLabel}
            body={bodyContent}

        />
    );
}
 
export default SearchModal;