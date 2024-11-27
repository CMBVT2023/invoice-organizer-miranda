export function FilterOptions({alterDisplayedChanges, currentFilter}) {
    let tempStyle = {
        backgroundColor: 'red'
    }

    return (
        <div>
            <button style={currentFilter == 'File Transfer' ? tempStyle : {}} onClick={() => alterDisplayedChanges('File Transfer')}>File Transfers</button>
            <button style={currentFilter == 'Folder Creation' ? tempStyle : {}} onClick={() => alterDisplayedChanges('Folder Creation')}>Folder Creations</button>
            <button style={currentFilter == 'Undo Action' ? tempStyle : {}} onClick={() => alterDisplayedChanges('Undo Action')}>Undone Actions</button>
        </div>
    )
}