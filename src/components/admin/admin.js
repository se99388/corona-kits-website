import React from 'react';
import SetKits from './set-kits';
import SetSubHeader from './set-sub-header';
import useHtmlTitle from '../../hooks/use-html-title';
const Admin = ()=>{
    useHtmlTitle('Admin');
    return(
        <>
        <SetSubHeader />
        <SetKits />
        </>
    )
}

export default Admin;