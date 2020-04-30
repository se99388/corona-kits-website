import React, { useState } from 'react';
import KitsSupply from './kits-supply';
import { Button, Table, Container, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import useHtmlTitle from '../../hooks/use-html-title';
import { MyTabs } from './corona-kits-users.styled';
import { data } from '../../corona-settings/data'

//This state create the "corona kits users" page
const CORONA_ITEMS =
    [
        { num: ['IMRP10243X'], desc: 'RT-PCR Seegene' },
        { num: ['IM7443004U'], desc: 'Extract. Seegene' },
        { num: ['IMHW4412'], desc: 'RT-PCR BGI' },
        { num: ['IMR2141'], desc: 'Extract. Zymo' },
        //VIRAL NUCLEIC ACID 96T NO.202-MVN40004
        { num: ['IMMVN40004'], desc: 'VIRAL. NO.202' },
        // 'MAGCORE VIRAL NUCLEIC ACID 96T NO.203-MVN40006' 
        { num: ['IMMVN40006'], desc: 'MAGCORE VIRAL. NO.203' },
        { num: ['IMEX00014C'], desc: 'STARMAG VIRAL/DNA' },
        { num: ['IMRP10243X', 'IM7443004U', 'IMHW4412', 'IMR2141', 'IMMVN40004', 'IMMVN40006', 'IMEX00014C'], desc: 'All' }
    ];
const CoronaKitsUsers = () => {
    useHtmlTitle('Corona-kits-users');
    // const [catalogNum, setCatalogNum] = useState('IMRP10243X');

    return (
        //THESE ARE THE TABS. THE TITLE IS TAKEN FROM item.desc. 
        <MyTabs id="controlled-tab-example"
            //this is the default open tab 
            // activeKey={catalogNum}
            // onSelect={(k) => setCatalogNum(k)}
            variant='tabs'
        >
            {CORONA_ITEMS.map((item, index) =>
                <Tab
                    key={index}
                    //click on the tab send the eventKey value to onSelect
                    eventKey={item.num}
                    title={item.desc}>
                    <KitsSupply
                        //IN THIS COMPONENT I SEND THE "PARTNAME" TO CREATE THE PAGE FOR THIS PARTNAME ONLY AND THE "PRODUCTS" WHICH IS CONTAINS ALL THE DETAILS ABOUT THIS SPECIFIC PARTNAME
                        key={index}
                        partname={item.num}
                        products={item.desc === 'All' ? data : { [item.num]: data[item.num[0]] }}
                    />
                </Tab>
            )}
        </MyTabs>

    )
}

export default CoronaKitsUsers;