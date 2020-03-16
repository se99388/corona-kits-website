import React, { useEffect, useState } from 'react';
import { SetKitsTable } from './set-kits-table.styled';
const SetKits = ({ kitsSupply, edit, deleteKit, isNewFormOpen }) => {

    const title = kitsSupply.length ? (
        <tr>
            <th>#</th>
            {Object.keys(kitsSupply[0]).map((item, index) =>
                <th key={index}>{item.toUpperCase()}</th>
            )}
            <th >UPDATE</th>
            <th>REMOVE</th>
        </tr>
    ) : null
    let rowNum = 1;

    const tableContent = (<>
        {kitsSupply.map((currentContent) =>
            <tr key={currentContent.id} id={currentContent.id}>
                <td>
                    {rowNum++}
                </td>
                {Object.entries(currentContent).map((item, index) =>
                    <td key={index} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>)}
                <td>
                    <button disabled={isNewFormOpen}
                        onClick={() => edit(currentContent)}
                    >
                        <img src='/images/edit.png' />
                    </button>
                </td>
                <td>
                    <button disabled={isNewFormOpen}
                        onClick={() => deleteKit(currentContent.id)}
                    ><img src='/images/delete.png'

                        />
                    </button>
                </td>
            </tr>
        )}
    </>)
    return (<>
        < SetKitsTable striped bordered hover responsive="sm">
            <thead>
                {title}
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </SetKitsTable >
    </>
    )
}

export default SetKits;