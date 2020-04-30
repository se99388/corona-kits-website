const createDataObj = (number_units_in_box, unit_per_sample,desc='',partname) => {

    return {
        number_units_in_box,
        unit_per_sample,
        samples_per_box: parseInt(number_units_in_box / unit_per_sample),
        text: '',
        desc,
        partname
    }
}
//This state create the "corona stock status" page and the sub-header in the "corona-kits-users" page
export const data = {
    IM235905: createDataObj(3840, 6.5,'IM235905'),
    IM235903: createDataObj(5760, 2,'IM235903'),
    IMSDP0096: createDataObj(9400, 1,'IMSDP0096'),
    IM7443004U: createDataObj(384, 1,'Extract. Seegene','IM7443004U'),
    IMHSP9655: createDataObj(4700, 1,'IMHSP9655'),
    IMTCS0803: createDataObj(960, 1,'IMTCS0803'),
    IMRP10243X: createDataObj(100, 1,'RT-PCR Seegene','IMRP10243X'),
    TTS238: createDataObj(1, 1,'' ,'TTS238'),
    CAP250: createDataObj(1, 1,'' ,'CAP250'),
    MBC0097: createDataObj(768, 1,'','MBC0097'),
    IMHW4412: createDataObj(50, 1, 'RT-PCR BGI','IMHW4412' ),
    IMR2141: createDataObj(384, 1,'Extract. Zymo','IMR2141'),
    IMMVN40004:createDataObj(96, 1,'VIRAL. NO.202','IMMVN40004'),
    IMMVN40006:createDataObj(96, 1,'MAGCORE VIRAL. NO.203','IMMVN40006'),
    IMEX00014C:createDataObj(384, 1,'STARMAG VIRAL/DNA','IMEX00014C')
}

export const tableOrderData = [
    { field: 'PARTNAME', title: 'catalog number' },
    { field: 'EPARTDES', title: 'description' },
    { field: 'BALANCE', title: 'quantity in stock (boxes)' },
    { field: 'samplesInStock', title: 'No. of samples in stock' },
    { field: 'PORDERS', title: 'open orders (boxes)' },
    { field: 'text', title: 'notes' }
]

