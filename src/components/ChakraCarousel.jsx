import { Box, Flex, Heading, Image, Button, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';


export const ChakraCarousel = ({ images }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [img, setImg] = useState();
  const carouselRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselRef.current = carouselRef.current.slice(0, images.length);
      setImgIdx(0);
      setImg(images[0]);
    };
  }, [images]);

  const handleImgChange = (newIdx) => {
    if (images && images.length > 0) {
      setImg(images[newIdx]);
      setImgIdx(newIdx);
      if (carouselRef?.current[newIdx]) {
        carouselRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      };
    };
  };

  const clickRight = () => {
    if (images && images.length > 0) {
      let newIdx = imgIdx + 1;
      if (newIdx >= images.length) {
        newIdx = 0
      };
      handleImgChange(newIdx);
    };
  };

  const clickLeft = () => {
    if (images && images.length > 0) {
      let newIdx = imgIdx - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      };
      handleImgChange(newIdx);
    };
  };

  return (
    <Flex
      m={"20px"}
      flexDir={"column"}
      alignItems={"center"}>
      <Heading>Chakra Carousel</Heading>
      <Box
        bgImage={`url(${img?.url})`}
        w={"60%"}
        h={"500px"}
        marginBottom={"8px"}
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        borderRadius={"1rem"}
        display={"flex"}
        justifyContent={"space-between"}>
        <Box
          h={"100%"}
          w={"50%"}
          opacity={0}
          _hover={{ opacity: 1 }}
          onClick={clickLeft}>
          <IconButton
            as={"icon"}
            icon={<FaArrowLeft />}
            bgColor={"rgba(0,0,0,0.5)"}
            display={"flex"}
            justify-content={"center"}
            align-items={"center"}
            h={"100%"}
            color={"white"}
            borderTopLeftRadius={"1rem"}
            borderBottomLeftRadius={"1rem"}
            marginRight={"80%"}
            _hover={{ bgColor: "rgba(0,0,0,0.75)" }}
            _active={{ bgColor: "rgb(0,0,0)" }} />
        </Box>
        <Box
          h={"100%"}
          w={"50%"}
          opacity={0}
          _hover={{ opacity: 1 }}
          onClick={clickRight}>
          <IconButton
            as={"icon"}
            icon={<FaArrowRight />}
            bgColor={"rgba(0,0,0,0.5)"}
            display={"flex"}
            justify-content={"center"}
            align-items={"center"}
            h={"100%"}
            color={"white"}
            borderTopRightRadius={"1rem"}
            borderBottomRightRadius={"1rem"}
            marginLeft={"80%"}
            _hover={{ bgColor: "rgba(0,0,0,0.75)" }} 
            _active={{ bgColor: "rgb(0,0,0)" }} />
        </Box>
      </Box>
      <Flex
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}>
        <IconButton
          as={"icon"}
          icon={<FaArrowLeft />}
          mx={"5px"}
          onClick={clickLeft} />
        <Flex
          w={"60%"}
          overflowX={"hidden"}
          bgColor={"rgba(0,0,0,0.5)"}
          borderRadius={"1rem"}
          p={"1rem"}>
          {images &&
            images.map((image, idx) => (
              <Box
                onClick={() => handleImgChange(idx)}
                key={image.id}
                ref={(e) => carouselRef.current[idx] = e}
                bgImage={`url(${image.url})`}
                marginRight={"10px"}
                h={"150px"}
                minW={"150px"}
                border={imgIdx === idx ? "3px solid #ffa700 !important" : "3px solid #ffa70000"}
                bgPos={"center"}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
                borderRadius={"1rem"}
                opacity={imgIdx === idx ? 1 : 0.5} />
            ))
          }
        </Flex>
        <IconButton
          as={"icon"}
          icon={<FaArrowRight />}
          mx={"5px"}
          onClick={clickRight} />
      </Flex>
    </Flex>
  );
};