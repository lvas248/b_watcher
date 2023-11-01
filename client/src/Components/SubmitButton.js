import LoadingIcon from "./LoadingIcon";

function SubmitButton({label, status}) {
    return (           
    <button
        className='submitButton'
    >
        {status === 'pending' ? <LoadingIcon />: label.toUpperCase() }
    </button> );
}

export default SubmitButton;