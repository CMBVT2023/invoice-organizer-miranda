import { ErrorToast } from "./ErrorToast"

export function ErrorToastDisplay({ errorsArray }) {
    
    const RenderErrorToasts = () => {
        return errorsArray.map(error => <ErrorToast key={error.name} error={error} isErrorToastDisplayed={error?.message !== undefined} />)
    }

    return (
        <>
            <RenderErrorToasts />
        </>
    )
}