/**@jsx jsx */
import {useState, useRef, useEffect} from 'react'
import {css, jsx} from '@emotion/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

const Arrow = ({ direction, handleClick }) => (
    <div
        onClick={handleClick}
        css={css`
      display: flex;
      position: absolute;
      top: 13%;
      ${direction === 'right' ? `right: 20px` : `left: 20px`};
      height: 50px;
      width: 50px;
      justify-content: center;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        &:focus {
          outline: 0;
        }
      }
    `}
    >
        {direction === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon/>}
    </div>
)

 const Slide = ({ content }) => (
     <Link   to="/"
             css={css`
            height: 100%;
            width: 100%;
            background-image: url('${content}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            object-fit: contain;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
        `}
    />
 );

 const SliderContent = props =>(
    <div css={css`
   transform: translateX(-${props.translate}px);
   transition: transform ease-out ${props.transition}s;
   height: 100%;
   width: ${props.width}px;
   display: flex;
 `}
 >{props.children}</div>
 )

const getWidth = () => window.innerWidth;

/**
 *  @function Slider
 */
const Slider = props => {  

    const {slides} = props;

    const firstSlide = slides[0];
    const secondSlide = slides[1];
    const lastSlide = slides[slides.length -1]
    
    const [state, setState] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition: 0.45,
        _slides: [lastSlide,firstSlide,secondSlide],
        
    })
   
    const { activeSlide, translate,_slides, transition } = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();

    //runs to infinity because no dependency array
    useEffect(()=>{
        autoPlayRef.current = nextSlide
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    })

    //only runs once because of the empty dependency array
    useEffect(()=>{
        const play = () =>{
            autoPlayRef.current()
        }
        const smooth = e =>{
            if(e.target.className.includes('SliderContent')){
                transitionRef.current();
            }  
        }
        const resize =() =>{
            resizeRef.current();
        }

        const interval = setInterval(play, props.autoPlay *1000)
        const transitionEnd = window.addEventListener('transitionend', smooth)
        const onResize = window.addEventListener('resize', resize);

        return () => {
            clearInterval(interval)
            window.removeEventListener('transitionend', transitionEnd)
           window.removeEventListener('resize', onResize)
        }
    },[])

    useEffect(()=>{
        if(transition ===0) setState({...state, transition: 0.45})
    },[transition])

    const handleResize =() =>{
        setState({...state, translate: getWidth() , transition: 0})
    }

    const smoothTransition = () => {
        let _slides = []

        // We're at the last slide.
        if (activeSlide === slides.length - 1)
            _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        // We're back at the first slide. Just reset to how it was on initial render
        else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
        // Create an array of the previous last slide, and the next two slides that follow it.
        else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

        setState({
            ...state,
            _slides,
            transition: 0,
            translate: getWidth()
        })
    }

    const nextSlide = () => {
        setState({
            ...state,
            activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
            translate: translate + getWidth(),
        })
    }

    const prevSlide = () => {
        setState({
            ...state,
            activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
            translate: 0
        })
    }

    return (
        <div css={SLiderCSS}>
            <SliderContent
                translate={translate}
                transition={transition}
                width={getWidth() * _slides.length}
            >
                {_slides.map((_slide, i) =>(
                <Slide width ={getWidth()} key={_slide + i} content={_slide}/>
                ))}
            </SliderContent>
            <Arrow direction={"left"} handleClick={prevSlide} />
            <Arrow direction={'right'} handleClick={nextSlide} />   
        </div>
    )
}
Slider.defaultProps ={
    slides: [],
    autoPlay: null
}
 const SLiderCSS = css`
        position:relative;
        height: 100vh;
        width: 100vw;
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap
        color: #111;
        `

export default Slider
