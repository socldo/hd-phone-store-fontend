import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import BannerData from '../../Helpers/HomePageBanner'
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
const Carousel = ({items, disableBtnControl = true}) => {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3, itemsFit: 'contain' },
    };


    return (
        <AliceCarousel
            animationType="fadeout"
            animationDuration={800}
            disableButtonsControls = {disableBtnControl}
            infinite
            items={items}
            mouseTracking
            disableDotsControls
            autoPlay
            autoPlayInterval={2500}
            responsive={responsive}
        />
    )
}

export default Carousel