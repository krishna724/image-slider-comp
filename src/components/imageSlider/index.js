import { useEffect, useState } from "react";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";
import "./styles.css"
export default function ImageSlider({limit=5, url, page=2}){
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    async function fetchImages(getUrl){
        try{
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            console.log(data);
            if(data){
                setImages(data);
                setLoading(false);
            }
        }catch(e){
            setErrorMsg(e.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        if(url !== '') fetchImages(url);
    }, [url]);
    if(loading){
        return <div>Loading please wait....</div>
    }
    if(errorMsg !== null){
        return <div>Opps, Something went wrong!! {errorMsg}</div>
    }
    function handlePrev(event){
        event.stopPropagation();
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }
    function handleNext(event){
        event.stopPropagation();
        setCurrentSlide(currentSlide === images.length - 1  ? 0 :  currentSlide + 1)
    }
    return <div className="container">
        <BsFillArrowLeftCircleFill onClick={(event) => handlePrev(event)} className="arrow arrow-left"/>
        {
            images.length ? 
            images.map((eachImage, index) => {
                return <img
                    key={eachImage.id}
                    alt={eachImage.download_url}
                    src={eachImage.download_url}
                    className={currentSlide === index ? "current-image" : "current-image hide-current-image"}
                />
            }): null
        }
        <BsFillArrowRightCircleFill onClick={(event) => handleNext(event)} className="arrow arrow-right"/>
        <span className="circle-indicator">
            {images.length ? 
            images.map((eachImage, index) => {
                return <button 
                onClick={() => setCurrentSlide(index)}
                key={eachImage.id}
                className={currentSlide === index ? "current-indicator" : "current-indicator inactive-indicator" }>    
                </button>
            }) : null}
        </span>
    </div>
}