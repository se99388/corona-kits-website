import {getRows} from './queries';


export const getKitsSupply = () => {
    const sql = `
    SELECT id, kit_name, catalog_number, location, quantity, to_char(date, 'DD/MM/YYYY') as date
	FROM kits_supply;
    `;

    return getRows(sql)
}