import Image from "./Image";

function ImageCarousel() {

    const images = [ 
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698413975/nathan-thomassin-Lk8bAFjPYqM-unsplash_rk7bdh.jpg', //binoculars
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414080/Screenshot_2023-10-27_at_9.33.23_AM_kh6sug.png', // hummingbird card
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414079/Screenshot_2023-10-27_at_9.37.00_AM_h5dlre.png', //hummingbird map
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698413964/devin-avery-61qsu_-wzr4-unsplash_mu3b9c.jpg', // bird sky
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414080/Screenshot_2023-10-27_at_9.35.17_AM_namovy.png', // stork card
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414079/Screenshot_2023-10-27_at_9.36.31_AM_blfeqs.png', //stork map
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698413975/nathan-thomassin-Lk8bAFjPYqM-unsplash_rk7bdh.jpg', //binoculars
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414080/Screenshot_2023-10-27_at_9.33.23_AM_kh6sug.png', // hummingbird card
        'https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698414079/Screenshot_2023-10-27_at_9.37.00_AM_h5dlre.png', //hummingbird map
    ]

    const renderImages = images.map( (image, index) => {
        return <Image key={index} src={image} />
    })

    return ( 
        <div className=' py-[5vh] overflow-x-hidden'>

            <div className='flex gap-[6vw] md:gap-[10vw] lg:gap-[3.3333vw] animate-marquee lg:animate-marquee-lg '>

                {renderImages}
                   
            </div>

        </div>
     );
}

export default ImageCarousel;