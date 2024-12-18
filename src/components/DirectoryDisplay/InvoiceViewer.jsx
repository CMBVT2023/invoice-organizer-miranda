import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { UseFetchGetRequest  } from '../../hooks/UseFetchGetRequest';

export function InvoiceViewer({ pageName, alterUserInteraction }) {
    const [ _, setQueryParameters ] = useSearchParams();
    const [ invoicePath, setInvoicePath ] = useState('');

    const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({ fetchURL: `http://localhost:3000/getInvoice`, key: 'invoiceViewer' });

    useEffect(() => {
        /**
         * @function Decodes a Base64 string that represents a file's binary data into an array buffer containing the bytes needed to reconstruct the file.
         * This is necessary since sending raw binary can lead to file corruption, so instead a string of characters representing the binary is used since all devices
         * can properly handle reading text characters.
         * Afterwards it creates a blob out of the array buffer.
         * @param {string} fileString - Base64 string that will be decoded.
         * @returns returns a object url that points to the path of the decoded file.
         */
        function decodePDFIntoBlob(fileString) {
            //? The atob method decodes the base64 string back to raw binary.
            const fileBinary = atob(fileString);
            //* A new array is constructed to create an array buffer.
            const arrayBuffer = new Uint8Array(fileBinary.length);
            
            //? The binary is iterated through and the associated index in the array buffer converts the binary value to an equivalent Unicode value.
            for (const index in fileBinary) {
                arrayBuffer[index] = fileBinary.charCodeAt(index);
            } 

            //? Constructs a blob out of the array buffer created from the buffer array.
            let pdfBlob = new Blob([arrayBuffer], {type: 'application/pdf'});
            
            //? Returns a objectUrl that points towards the pdfBlob.
            return URL.createObjectURL(pdfBlob);
        }

        if (!fetchData) return;

        if (fetchData.fileName != '') {
            setQueryParameters(prevParameters => {
                prevParameters.set('currentInvoice', fetchData.fileName);
                return prevParameters;
            });
            setInvoicePath(decodePDFIntoBlob(fetchData.file))
        };
    }, [fetchData])

    useEffect(() => {
        if (errorOccurred) {
            setQueryParameters(prevParameters => {
                prevParameters.set('currentInvoice', '');
                return prevParameters;
            })
        }
    }, [errorOccurred])

    useEffect(() => {
        if (isLoading) {
            alterUserInteraction({type: 'SET_ACTIVE'})
        } else {
            alterUserInteraction({type: 'SET_DISABLED'})
        }
    }, [isLoading, alterUserInteraction])

    return (
        <div>
            {isLoading && <h2>Retrieving Invoice</h2>}
            {errorOccurred ? <h2>{errorOccurred}</h2> : <iframe src={invoicePath} />}
        </div>
    )
}