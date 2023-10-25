import LoadingIcon from "./LoadingIcon";

function SubmitButton({label, status}) {
    return (           
    <button
        className='w-full border border-black py-[6px] px-[12px] bg-slate-300'
    >
        {status === 'pending' ? <LoadingIcon />: label.toUpperCase() }
    </button> );
}

export default SubmitButton;