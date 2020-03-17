import React,{useEffect} from 'react';

const useHtmlTitle = (title)=>{
    useEffect(()=>{
        document.title = title
    })
}

export default useHtmlTitle