import { getRows, getSingleRow } from './queries';


export const getKitsSupply = () => {
    const sql = `
    SELECT id, kit_name , catalog_number, location, quantity, to_char(date, 'DD/MM/YYYY') as date
	FROM kits_supply ORDER BY location;
    `;

    return getRows(sql)
}

export const addKit = (name, catNum, location, quantity, date) => {
    const sql = `INSERT INTO kits_supply
    (
        kit_name, 
        catalog_number, 
        location, 
        quantity, 
        date
    )
    VALUES
    ($1, $2, $3, $4, $5) RETURNING *
    `;
    return getSingleRow(sql, name, catNum, location, quantity, date);
}

export const updateKitSupply = (id, name, catNum, location, quantity, date) => {
    const sql = `UPDATE kits_supply
                    SET kit_name = $2,
                    catalog_number = $3,
                    location = $4,
                    quantity = $5,
                    date = $6
                WHERE id = $1 RETURNING *`;
    return getSingleRow(sql, id, name, catNum, location, quantity, date);
};

export const removeKitSupply = id => {
    const sql = `DELETE FROM kits_supply
                WHERE id = $1 RETURNING *`;
    return getSingleRow(sql, id);
};