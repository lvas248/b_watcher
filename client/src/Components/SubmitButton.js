import LoadingIcon from "./LoadingIcon";

function SubmitButton({label, status}) {
    return (           
    <button
        className='formButton w-full'
    >
        {status === 'pending' ? <LoadingIcon />: label.toUpperCase() }
    </button> );
}

export default SubmitButton;