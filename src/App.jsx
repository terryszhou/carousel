import React, { useEffect, useState } from 'react';
import './App.css';
import { VanillaCarousel } from './components/VanillaCarousel';
import { ChakraCarousel } from './components/ChakraCarousel';

export const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    setImages(
      Array.from(Array(10).keys()).map(id => (
        { id, url: `https://picsum.photos/1000?random=${id}` }
      )),
    );
  }, []);

  return (
    <div className="App">
      <VanillaCarousel images={images} />
      <ChakraCarousel images={images} />
    </div>
  );
}
