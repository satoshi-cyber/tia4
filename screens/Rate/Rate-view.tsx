import { Player } from 'video-react';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'video-react/dist/video-react.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Icon from '../../components/Icon';

import Linkedin from '../../public/linkedin.svg';
import Skeleton from 'react-loading-skeleton';

const PlayerTypes = Player as any;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Rate = () => {
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1280px)',
  });

  const [pages, setPages] = useState<any>([]);

  const { scrollY } = useScroll();

  const marginLeftAnimated = useTransform(scrollY, [0, 700], [0, 650]);
  const marginRightAnimated = useTransform(scrollY, [0, 700], [0, -650]);
  const scaleAnimated = useTransform(scrollY, [0, 700], [1, 0.6]);
  const docScaleAnimated = useTransform(scrollY, [0, 700], [0.8, 1]);
  const containerMarginRightAnimated = useTransform(
    scrollY,
    [0, 700],
    [0, -450]
  );
  const containerMarginTopAnimated = useTransform(scrollY, [0, 700], [0, 200]);
  const opacityAnimated = useTransform(scrollY, [0, 100], [1, 0]);

  const marginLeft = isLargeScreen ? marginLeftAnimated : 0;
  const marginRight = isLargeScreen ? marginRightAnimated : 0;
  const scale = isLargeScreen ? scaleAnimated : 1;
  const docScale = isLargeScreen ? docScaleAnimated : 1;
  const containerMarginRight = isLargeScreen ? containerMarginRightAnimated : 0;
  const containerMarginTop = isLargeScreen ? containerMarginTopAnimated : 0;
  const opacity = isLargeScreen ? opacityAnimated : 1;

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setPages(
      Array(numPages)
        .fill(0)
        .map((_, index) => index + 1)
    );
  };

  return (
    <div className="flex flex-1 w-full justify-center pt-28 md:pt-16">
      <motion.div
        style={{
          marginLeft: containerMarginRight,
          marginTop: containerMarginTop,
        }}
      >
        <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
          <div className="flex flex-col max-w-[700px] w-full mx-6 md:mx-0">
            <motion.div
              style={{ marginLeft, marginRight, scale }}
              className="xl:sticky xl:top-28 xl:top-16 z-20 origin-top pt-6"
            >
              <div>
                <motion.div
                  className="flex flex-row mb-4 items-center"
                  style={{ opacity }}
                >
                  <Icon
                    name="HiOutlineBriefcase"
                    size={20}
                    className="text-black mr-3"
                  />
                  Senior software developer
                </motion.div>
                <PlayerTypes
                  width="100%"
                  className="flex-none rounded-2xl overflow-hidden w-full h-[450px]"
                  fluid={false}
                  playsInline
                  controls
                  autoPlay
                  src="/videoplayback.mp4"
                />
                <motion.div
                  className="flex justify-between mt-4 mb-4 md:mb-10"
                  style={{ opacity }}
                >
                  <div className="flex">
                    <div className="mr-4">
                      <img
                        alt="avatar"
                        src="/avatar.jpeg"
                        width={50}
                        height={50}
                        className="rounded-full border"
                      />
                    </div>
                    <div>
                      <div className="flex flex-row items-center">
                        <Icon
                          name="HiMail"
                          size={30}
                          className="text-black mr-3"
                        />
                        <Linkedin width={20} />
                      </div>
                      <p className="text-2xl">Lorem ipsum</p>
                      <p className="text-xs text-gray-500 max-w-[300px]">
                        Lorem ipsum dolor sit lorem dolor sum dolor sit lorem
                        Lorem ipsum dolor sit lorem dolor sum dolor sit lorem
                      </p>
                    </div>
                  </div>
                  <div className="flex-none hidden md:block">
                    <div className="grid grid-cols-2 grid-rows-1 gap-4 border-2 p-2 rounded-full">
                      <Icon
                        name="HiThumbDown"
                        size={50}
                        className="text-black"
                      />
                      <Icon name="HiThumbUp" size={50} className="text-black" />
                    </div>
                  </div>
                  <Icon name="HiBookmark" size={40} className="text-black" />
                </motion.div>
                <div className="block md:hidden flex justify-center mb-6">
                  <div className="grid grid-cols-2 grid-rows-1 gap-4 border-2 p-2 rounded-full">
                    <Icon name="HiThumbDown" size={50} className="text-black" />
                    <Icon name="HiThumbUp" size={50} className="text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="origin-top hidden md:block"
              style={{ scale: docScale }}
            >
              <Document
                file="/awesome-cv.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="border my-10 xl:-ml-[60px] xl:w-[820px] p-16">
                    <Skeleton count={50} />
                  </div>
                }
              >
                {pages.map((index: number) => (
                  <Page
                    pageNumber={index}
                    width={820}
                    className="border my-10 -ml-[60px]"
                  />
                ))}
              </Document>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rate;
