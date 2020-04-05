import React, { useState } from 'react';
import {MyImg,ImgDiv} from './sort.styled'
const Sort = ({ sort,keyToSort }) => {
    const [isAsc, setIsAsc] = useState(true);
    const handleSort = () => {
        setIsAsc(!isAsc);
        sort(isAsc,keyToSort);
    }
    return (
        <ImgDiv onClick={handleSort} 
        >
            {isAsc ? <MyImg src='/images/down.png' />: <MyImg
             src='/images/up.png'/>}
        </ImgDiv>
    )
}

export default Sort;