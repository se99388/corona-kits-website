import React, { useState } from 'react';
import KitsSupply from '../kits-supply';
import { Button, Table, Container, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import useHtmlTitle from '../../hooks/use-html-title';
import { MyTabs } from './corona-kits-users.styled';
import {data} from '../all-kits-status/data'


const CORONA_ITEMS =
    [
        { num: ['IMRP10243X'], desc: 'RT-PCR Seegene' },
        { num: ['IM7443004U'], desc: 'Extract. Seegene' },
        { num: ['IMHW4412'], desc: 'RT-PCR BGI' },
        { num: ['IMR2141'], desc: 'Extract. Zymo' },
        { num: ['IMRP10243X', 'IM7443004U', 'IMHW4412', 'IMR2141'], desc: 'All'}
    ];

const CORONA_ITEMS_OBJ =
{
    IMRP10243X: { num: ['IMRP10243X'], desc: 'RT-PCR Seegene' },
    IM7443004U: { num: ['IM7443004U'], desc: 'Extract. Seegene' },
    IMHW4412: { num: ['IMHW4412'], desc: 'RT-PCR BGI' },
    IMR2141: { num: ['IMR2141'], desc: 'Extract. Zymo' },
    all: { num: ['IMRP10243X', 'IM7443004U', 'IMHW4412', 'IMR2141'], desc: ['RT-PCR Seegene', 'Extract. Seegene', 'RT-PCR BGI', 'Extract. Zymo'] }
};

const CoronaKitsUsers = () => {
    useHtmlTitle('Corona-kits-users');
    const [catalogNum, setCatalogNum] = useState('IMRP10243X');
    return (
        <MyTabs id="controlled-tab-example"
            //this is the default open tab 
            activeKey={catalogNum}
            onSelect={(k) => setCatalogNum(k)}
            variant='tabs'
        >
            {CORONA_ITEMS.map((item, index) =>
                <Tab
                    key={index}
                    //click on the tab send the eventKey value to onSelect
                    eventKey={item.num}
                    title={item.desc}>
                    <KitsSupply
                        key={index}
                        partname={item.num}
                        description={item.desc}
                        products={data}
                    />
                </Tab>
            )}
        </MyTabs>

    )
}

export default CoronaKitsUsers;