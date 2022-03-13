import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
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
      alignItems={"center"}
      flexDir={"column"}
      m={"20px"}>
      <Heading>Chakra Carousel</Heading>
      <Box
        bgImage={`url(${img?.url})`}
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        borderRadius={"1rem"}
        display={"flex"}
        h={"500px"}
        justifyContent={"space-between"}
        marginBottom={"8px"}
        w={"60%"}>
        <Box
          h={"100%"}
          onClick={clickLeft}
          opacity={0}
          w={"50%"}
          _hover={{ opacity: 1 }}>
          <IconButton
            align-items={"center"}
            as={"icon"}
            bgColor={"rgba(0,0,0,0.5)"}
            borderBottomLeftRadius={"1rem"}
            borderTopLeftRadius={"1rem"}
            display={"flex"}
            color={"white"}
            h={"100%"}
            icon={<FaArrowLeft />}
            justify-content={"center"}
            marginRight={"80%"}
            _active={{ bgColor: "rgb(0,0,0)" }}
            _hover={{ bgColor: "rgba(0,0,0,0.75)" }} />
        </Box>
        <Box
          h={"100%"}
          opacity={0}
          onClick={clickRight}
          w={"50%"}
          _hover={{ opacity: 1 }}>
          <IconButton
            align-items={"center"}
            as={"icon"}
            bgColor={"rgba(0,0,0,0.5)"}
            borderBottomRightRadius={"1rem"}
            borderTopRightRadius={"1rem"}
            color={"white"}
            display={"flex"}
            h={"100%"}
            icon={<FaArrowRight />}
            justify-content={"center"}
            marginLeft={"80%"}
            _active={{ bgColor: "rgb(0,0,0)" }}
            _hover={{ bgColor: "rgba(0,0,0,0.75)" }} />
        </Box>
      </Box>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
        w={"100%"}>
        <IconButton
          as={"icon"}
          icon={<FaArrowLeft />}
          mx={"5px"}
          onClick={clickLeft} />
        <Flex
          bgColor={"rgba(0,0,0,0.5)"}
          borderRadius={"1rem"}
          overflowX={"hidden"}
          p={"1rem"}
          w={"60%"}>
          {images && images.map((image, idx) => (
            <Box
              bgImage={`url(${image.url})`}
              bgPos={"center"}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              border={imgIdx === idx ? "3px solid #ffa700 !important" : "3px solid #ffa70000"}
              borderRadius={"1rem"}
              h={"150px"}
              key={image.id}
              marginRight={"10px"}
              minW={"150px"}
              onClick={() => handleImgChange(idx)}
              opacity={imgIdx === idx ? 1 : 0.5}
              ref={(e) => carouselRef.current[idx] = e} />
          ))}
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