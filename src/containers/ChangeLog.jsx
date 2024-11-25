import { useEffect, useState } from "react";
import { ChangeInfo } from "../components/ChangeLog/ChangeInfo";
import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

export function ChangeLog({ changeLog, alterChangeLog }) {
    const [ undoChangeInfo, setUndoChangeInfo ] = useState(null);

    const { isLoading: isUndoingAction, errorOccurred: undoActionError, fetchResponse: undoActionData } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/undoAction', queries: undoChangeInfo})

    useEffect(() => {
        if (undoActionData) {
            alterChangeLog(prevChanges => {
                let changes = [ undoActionData, ...prevChanges ];
                if (undoActionData.result == "Succeeded") {
                    changes = changes.filter(change => change.id != undoActionData.undoneActionId);
                }

                return changes;
            })
        }
    }, [undoActionData, alterChangeLog])

    function undoChange(undoObj, id, action) {
        let userResult = confirm('Are You Sure You Want to Undo This Change?')
        if (!userResult) return;
        
        setUndoChangeInfo({
            action: action,
            actionId: id,
            undoInfo: JSON.stringify(undoObj)
        })
    }

    return (
        <div>
            {undoActionError && <h3>{undoActionError}</h3>}
            {changeLog && changeLog.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} isButtonDisabled={isUndoingAction} />)}
        </div>
    )
} 