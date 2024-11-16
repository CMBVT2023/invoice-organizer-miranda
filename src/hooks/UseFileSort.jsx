import { useEffect, useState } from "react";

export function UseFileSort({ fileTransfer, setIsUserInteractionDisabled }) {
    const [ isTransferring, setIsTransferring ] = useState(false);
    const [ errorOcurred, setErrorOcurred ] = useState(false);
    const [ transferResult, setTransferResult ] = useState({});

    useEffect(() => {
        if (fileTransfer) {
            async function triggerFileTransfer() {
                try { 
                    setIsTransferring(true);

                    const baseURL = 'http://localhost:3000/sortFile'
                    let postURL = `${baseURL}?customerFolder=${fileTransfer.customerFolder}&letterFolder=${fileTransfer.letterFolder}&filePath=${fileTransfer.invoicePath}&fileName=${fileTransfer.invoiceName}`

                    let response = await fetch(postURL, {
                        method: 'POST',
                    })

                    if (!response.ok) throw new Error('Failed To Make File Sort Request');
                    let transferResponse = await response.json();

                    setTransferResult(transferResponse);
                } catch (error) {
                    console.error(error);
                    setErrorOcurred(error.message);
                } finally {
                    setIsUserInteractionDisabled(false)
                }
            }
            
            setIsUserInteractionDisabled(true);
            triggerFileTransfer()
        }
    }, [fileTransfer, setIsUserInteractionDisabled])

    return {isTransferring, errorOcurred, transferResult}
}