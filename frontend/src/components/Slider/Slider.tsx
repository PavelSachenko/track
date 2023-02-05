import { useState, useRef } from "react";

import throttle from '../../utils/throttle';
import { useToggle, useDidMount } from '../../hooks';

import './Slider.scss'

interface IProps {
  onUpdate: (steps: number) => void,
  countOfSteps: number,
  currentStep?: number,
}

const maxCountOfSteps = 100; // 100%

const Slider = (props: IProps) => {
  const {
    onUpdate,
    countOfSteps,
  } = props;

  const [currentStep, setCurrentStep] = useState(0);
  const [countInStep, setCountInStep] = useState(1); // how much steps in step (in proportion). Example: 2 step of 5 It's 20/100
  const [isActive, setIsActive] = useToggle(false); 
  
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useDidMount(() => { // Init
    props.currentStep && setCurrentStep(props.currentStep);
    setCountInStep(maxCountOfSteps / countOfSteps);
  })

  //Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsActive(true);
    updateThumbCoords(e.clientX);

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  }

  const onMouseUp = () => {
    setIsActive(false);

    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  }

  const onMouseMove = (e: MouseEvent) => {
    throttledUpdateThumbCoords(e.clientX);
  }

  //Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsActive(true);
    updateThumbCoords(e.touches[0].clientX);

    document.addEventListener("touchend", onTouchEnd);
    document.addEventListener("touchmove", onTouchMove);
  }

  const onTouchEnd = () => {
    setIsActive(false);

    document.removeEventListener("touchend", onTouchEnd);
    document.removeEventListener("touchmove", onTouchMove);
  }

  const onTouchMove = (e: TouchEvent) => {
    throttledUpdateThumbCoords(e.touches[0].clientX); 
  }

  const throttledUpdateThumbCoords = throttle((clientX: number) => {
    updateThumbCoords(clientX);
  }, 20)

  const updateThumbCoords = (clientX: number) => {
    if (sliderRef && sliderRef.current && thumbRef && thumbRef.current) {
      const sliderWidth = sliderRef.current.getBoundingClientRect().width;
      const thumbWidth = thumbRef.current.getBoundingClientRect().width;
      const rightEdge = sliderWidth - thumbWidth;
      const currentLeft = sliderRef.current.getBoundingClientRect().left + (thumbWidth / 2);
      const shiftX = clientX - currentLeft;

      const sizeOfStep = rightEdge / maxCountOfSteps; // in pixels

      if (clientX < currentLeft) {
        setCurrentStep(0);
        onUpdate(0);

        return;
      }
      else if (shiftX > rightEdge) {
        setCurrentStep(maxCountOfSteps);
        onUpdate(countOfSteps);

        return;
      }

      const newCurrentStepInPercentage = shiftX / sizeOfStep; // For Slider
      const newCurrentStepInSeconds = newCurrentStepInPercentage / countInStep; // For Player

      setCurrentStep(newCurrentStepInPercentage);
      onUpdate(newCurrentStepInSeconds);
    }
  }

  const getLeftOffsetFor = (forWhat: string) => {
    if (thumbRef && thumbRef.current) {
      const leftInPercentage = currentStep;

      const thumbWidth = thumbRef.current.offsetWidth;
      const substractWidth = forWhat === 'left-path' // left-path It's line that moves behind thumb
        ? 0
        : thumbWidth * (currentStep / 100);

      return `calc(${leftInPercentage}% - ${substractWidth}px)`;
    }
  }

  return (
    <div
      className="slider"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      ref={sliderRef}
    >
      <div
        className="slider__slider-left-path"
        style={{
          width: getLeftOffsetFor('left-path')
        }}
      />

      <div
        className={"slider__thumb" + (isActive ? ' active' : '')}
        ref={thumbRef}
        style={{
          left: getLeftOffsetFor('thumb')
        }}
      />

      <div className="slider__slider-right-path" />
    </div>
  );
};

export default Slider;