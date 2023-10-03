import loadingIcon from '../Assets/Icons/loading.png'

function LoadingIcon() {
    return ( 
        <img className='animate-spin h-[25px] m-auto' alt='loading' src={loadingIcon} />
     );
}

export default LoadingIcon;