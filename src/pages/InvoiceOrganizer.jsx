import { NavBar } from "../ui/NavBar";
import { Footer } from "../ui/Footer";

import { UserInputs } from "../containers/InvoiceArea/UserInputs"
import { FolderDisplay } from "../containers/InvoiceArea/FolderDisplay"
import { ChangeLog } from "../containers/ChangeLog"
import { InvoiceViewer } from "../containers/InvoiceArea/InvoiceViewer"


import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { UseFileSort } from "../hooks/UseFileSort";

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
    Finally, remake the git request only for the next invoice since the customer directories should not be changed. */

export function InvoiceOrganizer() {
    const [ isUserInteractionDisabled, setIsUserInteractionDisabled ] = useState(true);
    const [ nameFilter, setNameFilter ] = useState('');

    const [ selectedYear, setSelectedYear ] = useState(0);

    const [ currentInvoice, setCurrentInvoice ] = useState('');
    const [ selectedCustomer, setSelectedCustomer ] = useState('');

    const [ fileTransfer, setFileTransfer ] = useState(null);

    const { isTransferring, errorOcurred: fileTransferError, transferResult } = UseFileSort({ fileTransfer });

    function createFileInfo() {
      if (selectedCustomer == '' || currentInvoice == '') return;

      // Temporary
      function convertString(name) {
        let regexPattern = /\W+/g;
        return name.replace(regexPattern, '%20')
      }

      let queryString = convertString(selectedCustomer);

      setFileTransfer({invoicePath: currentInvoice, 
        customerFolder: queryString.toUpperCase(), 
        letterFolder: queryString[0].toUpperCase(), 
        invoiceName: currentInvoice.substring(currentInvoice.lastIndexOf('/') + 1)});
    }

    return (
      <>
        <NavBar sortFile={createFileInfo} />

        <main>
          <UserInputs filter={[nameFilter, setNameFilter]} year={[ selectedYear, setSelectedYear ]} isDisabled={isUserInteractionDisabled} />
          
          <div>
            <FolderDisplay 
              enableInteraction={setIsUserInteractionDisabled} sortFile={createFileInfo} 
                nameFilter={nameFilter} setCustomer={setSelectedCustomer} />

            <ChangeLog />
          </div>

          <InvoiceViewer setCurrentInvoice={setCurrentInvoice} />
        </main>

        <Footer sortFile={createFileInfo} />
      </>
    )
}