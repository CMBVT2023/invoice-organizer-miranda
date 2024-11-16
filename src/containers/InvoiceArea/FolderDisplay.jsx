import { useEffect, useState } from "react";
import { UseDirectoryUpdate } from "../../hooks/UseDirectoryUpdate"
import { FolderList } from "../../components/InvoiceArea/FoldersList";

export function FolderDisplay({ disableUserInteraction, sortFile, nameFilter, setCustomer }) {
    const {isLoading: isCustomerFoldersLoading, customerFolders, errorOcurred: customerFoldersError} = UseDirectoryUpdate({disableUserInteraction});

    return (
        <div>
            {isCustomerFoldersLoading && <h2>Gathering Customer Folders</h2>}
            {customerFoldersError ? <h2>{customerFoldersError}</h2> : <FolderList customers={customerFolders} nameFilter={nameFilter} setCustomer={setCustomer} />}
        </div>
    )
}