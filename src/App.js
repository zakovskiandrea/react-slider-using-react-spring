import React, { useState } from "react";
import "./App.css";
import { useTransition, animated, config } from "react-spring";
import Arrow from "./Arrow";
import Dots from "./Dots";
import { easeCircle } from "d3-ease";

const imageUrls = [
  "https://frontendtest.digitalpresent.mk/images/1.png",
  "https://frontendtest.digitalpresent.mk/images/2.png",
  "https://frontendtest.digitalpresent.mk/images/3.png",
  "https://frontendtest.digitalpresent.mk/images/4.png",
];

const slides = imageUrls.map((url) => ({ style }) => (
  <animated.div
    className="slide"
    style={{
      ...style,

      backgroundImage: `url(${url})`,
    }}
  ></animated.div>
));

const App = () => {
  const [activeSlide, setSlide] = useState(0);
  const [slideLeft, setDirection] = useState(true);

  const prevSlide = () => {
    setDirection(false);
    if (activeSlide === 0) return;
    setSlide(activeSlide - 1);
  };
  const nextSlide = () => {
    setDirection(true);
    if (activeSlide === slides.length - 1) return;
    setSlide(activeSlide + 1);
  };

  const transitions = useTransition(activeSlide, (p) => p, {
    from: {
      opacity: 0.5,
      transform: slideLeft ? "translate3d(100%,0,0)" : "translate3d(-100%,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0.5,
      transform: slideLeft ? "translate3d(-50%,0,0)" : "translate3d(50%,0,0)",
    },
    config: {
      duration: 350,
      easing: easeCircle,
    },
  });

  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => {
        const Slide = slides[item];
        return <Slide key={key} style={props} />;
      })}
      <Dots slides={slides} activeSlide={activeSlide} />
      <Arrow clicked={() => prevSlide()} direction="left" />
      <Arrow clicked={() => nextSlide()} direction="right" />
    </div>
  );
};

export default App;
