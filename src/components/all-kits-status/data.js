const createDataObj=(number_units_in_box,unit_per_sample)=>{

    return {
        number_units_in_box,
        unit_per_sample,
        samples_per_box: parseInt(number_units_in_box / unit_per_sample),
        text:''
    }
}

export const data = {
    IM235905:createDataObj(3840,6.5),
    IM235903: createDataObj(5760,2),
    IMSDP0096: createDataObj(9400,1),
    IM7443004U: createDataObj(384,1),
    IMHSP9655: createDataObj(4700,1),
    IMTCS0803: createDataObj(960,1),
    IMRP10243X: createDataObj(100,1),
    TTS238: createDataObj(1,1),
    CAP250: createDataObj(1,1),



}