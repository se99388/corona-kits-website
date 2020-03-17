import { getRows, getSingleRow } from './queries';


export const getKits = () => {
    const sql = `
    SELECT id, name , catalog_number, quantity
	FROM kits ORDER BY name;
    `;

    return getRows(sql)
}

export const addKit = (name, catNum, quantity) => {
    const sql = `INSERT INTO kits
    (
        name, 
        catalog_number, 
        quantity
    )
    VALUES
    ($1, $2, $3) RETURNING *
    `;
    return getSingleRow(sql, name, catNum, quantity);
}

export const updateKit = (id, name, catNum, quantity) => {
    const sql = `UPDATE kits
                    SET name = $2,
                    catalog_number = $3,
                    quantity = $4
                WHERE id = $1 RETURNING *`;
    return getSingleRow(sql, id, name, catNum, quantity);
};

export const removeKit = id => {
    const sql = `DELETE FROM kits
                WHERE id = $1 RETURNING *`;
    return getSingleRow(sql, id);
};