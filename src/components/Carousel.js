/**@jsx jsx */
import {css, jsx} from "@emotion/core"
import { Link } from "react-router-dom"
import {useState, useRef,useEffect} from "react"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Slider } from "@material-ui/core";


const Arrow =({direction, handleClick}) =>{
    return(
        <div css={css`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        top: 25%;
        display: flex;
        position: absolute;
        ${direction === 'right' ? 'right: 25px': 'left: 25px'};
        justify-content: center;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;
        &:hover{
            transform: scale(1.1);
        }
        img{
            transform: translateX(${direction === 'left'? '-2': '2'}px);
            &:focus{
                outline: 0;
            }
        }

        `}
        onClick={handleClick}>
         {direction ==='right'? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </div>
    )
}
const Slide = ({image}) =>(
     <Link to="/"
           css={css`
           background-image: url('${image}');
           background-repeat: no-repeat;
           background-size: cover;
           background-position: center;
           width: 100%;
           height: 100%;
           object-fit: contain;
           `} />
)

 const SliderContent = props =>
        (
            <div css={css`
            transform: translateX(-${ props.translate}px);
            transition: ease-out ${props.transition}s;
             display: flex;
             height: 100%;
             width: ${props.width}px;

            `}>
             {props.children}
            </div>
        )
/*
const SliderContent = styled.div`
             transform: translateX(-${props => props.translate}px);
             transition: ease-out ${props => props.transition}s;
             display: flex;
             height: 100%;
             width: ${props => props.width}px;`*/

const getWidth = () => window.innerWidth;
/**
 * @function Carousel
 */


 const Carousel = (props) =>{

      const {slides} = props;

      const firstSlide = slides[0];
      const secondSlide = slides[1];
      const lastSlide = slides[slides.length -1];
    //destructuring the state
    const [state, setState] = useState({
        transition: 0.45,
        translate: getWidth(),
        activeSlide: 0,
        _slides: [lastSlide, firstSlide,secondSlide],
    })
    //object destructuring
    const {transition, translate, activeSlide, _slides} = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();

    useEffect(()=>{
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    })
    useEffect(()=>{
        const play = () =>{
            autoPlayRef.current()
        }
        const smooth =e =>{
            if(e.target.className.includes('SliderContent')){
                transitionRef.current();
            }
            
        }
        const resize =() =>{
            resizeRef.current();
        }

        const interval = setInterval(play, props.autoPlay* 1000)
        const transitionEnd = window.addEventListener('transitionend', smooth);
        const onResize = window.addEventListener('resize', resize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('transitionend',transitionEnd);
            window.removeEventListener('resize', onResize);
        }
    },[])

    useEffect(()=>{
        if(transition ===0) setState({...state, transition: 0.45})
    },[transition])

    const handleResize =() =>{
        setState({...state, translate: getWidth(), transition:0})
    }

     const smoothTransition =()=>{
         let _slides=[]

         //we're at the last slide
         if(activeSlide === slides.length-1)
         _slides =[slides[slides.length-2], lastSlide, firstSlide]
         //we're back at the first slide.just reset to start - initilal render
         else if (activeSlide ===0) _slides =[lastSlide,firstSlide,secondSlide]
         //create an array of the previous last slide, and the two that will follow
         else _slides =slides.slice(activeSlide -1, activeSlide + 2)

         setState({
             ...state,
             _slides,
             transition: 0,
             translate: getWidth()
         })
     }
    const nextSlide = ()=> {
        //if it is last reset 
        setState({
            ...state,
            activeSlide: activeSlide === slides.length-1 ? 0 : activeSlide + 1,
            translate: translate + getWidth(),
        })

    }
    const prevSlide = () => {
      
        setState({
            ...state,
            activeSlide: activeSlide === 0 ? slides.length -1 : activeSlide -1 ,
            translate: 0,
        })
    }

     return(
         <div css={CarouselCSS}>
            <SliderContent 
            width={getWidth() * _slides.length}
            transition={transition}
            translate={translate}
            >
             {_slides.map((_slide, i )=> (<Slide width={getWidth} key={_slide + i} image={_slide} />))}
            </SliderContent>
            <Arrow direction ={'left'} handleClick={nextSlide} />
             <Arrow direction={'right'} handleClick={prevSlide}/>
         </div>
     )
 }
 //why this
 Slider.defaultProps ={
     slides: [],
     autoPlay: null,
 }

const CarouselCSS =css`
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    
    `
 export default Carousel;