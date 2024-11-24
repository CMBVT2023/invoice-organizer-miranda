import { NavBar } from "../ui/NavBar";
import { Footer } from "../ui/Footer";


import { useEffect, useState } from "react";
import { InvoiceArea } from "../containers/InvoiceOrganizer/InvoiceArea";

import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

// Pseudo Code
/*  Send two get request to the server
One to get the current state of the customer folder directory.
This get request should return 26 separate arrays of customer names all separated from a-z.
Store these arrays within another array.
One to get the first invoice contained within the invoice folder
Upon receiving the customer folder directory, display a no customer indicator until the user types a name into the filter input.
Disable the user input until the get request is returned.
Once the user starts to enter a name into the filter, take the first character they enter and select the array associated.
Use charCodes so that the first character entered will access the appropriate array via its index within the array.
A = 0, B = 1, C=2 and so on.
As the filter removes non matching names, it should filter from the start of the customer’s name or else filter the name out, even if the filter input is contained within the customer’s name.
If not already done, a default value based on the current year should be set within the year selector, and the user will have the choice to set it as far as ten years back or forwards. 
Once the user finds their customer, they have the choice to select the customer by clicking on their name and then clicking the sort button on the page to send the file to said user’s directory. Else, they can click the button next to the user’s name to quickly send the file to said user’s directory.
To transfer the file, make a post request to the server the provides the current invoice’s path, the customer’s folder path, and the year under which the invoice should be stored.
The client should handle creating the new absolute path string for the invoice so that it can add this action to the Changelog, these will stored by the client and not the server.
The absolute path will be generated by first appending the year to the end of the customer’s folder path before finally appending the invoice’s file name to the end.
Have the post request either resolve with a successful transfer or throw an error to alert the user that the transfer was unsuccessful.
Have an asynchronous function wait for the post request to resolve, and depending on its outcome, convert the file icon within the NavBar element to signify its outcome, have it change to green if successful or red if unsuccessful.
Have the color change revert after like 2 seconds.
Also if the user hovers, display the last change within the Changelog.
Finally, remake the get request only for the next invoice since the customer directories should not be changed. */

export function InvoiceOrganizer() {
    const [ isUserInteractionDisabled, setIsUserInteractionDisabled ] = useState(true);

    const [ selectedYear, setSelectedYear ] = useState(0);

    const [ currentInvoice, setCurrentInvoice ] = useState('');
    const [ selectedCustomer, setSelectedCustomer ] = useState('');

    const [ fileTransfer, setFileTransfer ] = useState(null);
    const [ newCustomerFolderName, setNewCustomerFolderName ] = useState(null);
    const [ changeOccurred, setChangeOccurred ] = useState([]);

    const [ showNewFolderModal, setShowNewFolderModal ] = useState(false);
    const toggleNewFolderModal = () => setShowNewFolderModal(!showNewFolderModal);

    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, fetchResponse: folderCreationResult } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/createNewFolder', queries: newCustomerFolderName})
    const { isLoading: isTransferring, errorOccurred: fileTransferError, fetchResponse: transferResult } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/sortFile', queries: fileTransfer})

    useEffect(() => {
      setIsUserInteractionDisabled(isNewFolderInitializing || isTransferring)
    }, [isTransferring, isNewFolderInitializing])

    useEffect(() => {
      //! If an error occurs for either fetch post attempt, clear the object associate with the action so that the user may attempt to recall their request..
      if (newFolderError) setNewCustomerFolderName(null);
      if (fileTransferError) setFileTransfer(null);
    }, [newFolderError, fileTransferError])

    useEffect(() => {
      //? Checks if either a file sort fetch resolved.
      if (transferResult) {
        setChangeOccurred(prevChanges => [transferResult, ...prevChanges]);
      }
    }, [transferResult])
    useEffect(() => {
      //? Checks if either a folderCreation fetch resolved.
      if (folderCreationResult) {
        setChangeOccurred(prevChanges => [folderCreationResult, ...prevChanges]);
      }
    }, [folderCreationResult])

    function createFileInfo(quickSortName) {
      //? Checks if a name parameter was passed in, and if it was, that name is used instead of whats currently saved in state.
      let customerName = quickSortName ? quickSortName : selectedCustomer;
      if (customerName == '' || currentInvoice == '') return;

      // Temporary
      function convertString(name) {
        let regexPattern = /\W+/g;
        return name.replace(regexPattern, '%20')
      }

      let queryString = convertString(selectedCustomer);

      setFileTransfer({
        invoiceName: currentInvoice, 
        customerFolderPath: `${queryString[0].toUpperCase()}/${queryString.toUpperCase()}`,
        customerName: queryString.toUpperCase(),
        year: selectedYear,
      });
    }

    return (
      <>
        <NavBar 
          sortFile={createFileInfo} isInteractionDisabled={isUserInteractionDisabled}
            isChanging={isNewFolderInitializing || isTransferring} changeResult={changeOccurred[0]} 
             toggleNewFolderModal={toggleNewFolderModal} />

        <InvoiceArea year={[ selectedYear, setSelectedYear ]} userInteraction={[isUserInteractionDisabled, setIsUserInteractionDisabled]}
          sortFile={createFileInfo} setCustomer={setSelectedCustomer} currentInvoice={setCurrentInvoice} 
            transferOccurred={transferResult} showNewFolderModal={showNewFolderModal}
              toggleNewFolderModal={toggleNewFolderModal} newCustomerFolderName={setNewCustomerFolderName} 
                changeLog={changeOccurred} />

        {/* Turn these into toast Icons for the bottom right of the screen */}
        {fileTransferError && <h2>{fileTransferError}</h2>}
        {newFolderError && <h2>{newFolderError}</h2>}


        <Footer sortFile={createFileInfo} isInteractionDisabled={isUserInteractionDisabled}
          toggleNewFolderModal={toggleNewFolderModal} />
      </>
    )
}