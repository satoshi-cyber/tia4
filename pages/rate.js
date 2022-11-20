import { Player } from 'video-react'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'video-react/dist/video-react.css'
import dynamic from 'next/dynamic'

import Icon from '../components/Icon'
import Menu from '../components/Menu'

import Linkedin from '../public/linkedin.svg'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function Home() {
  const [pages, setPages] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(
      Array(numPages)
        .fill(0)
        .map((_, index) => index + 1)
    )
  }

  return (
    <div className="flex flex-1 w-full justify-center pt-28 md:pt-16">
      <Menu />
      <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
        <div className="flex flex-col max-w-[600px] w-full mx-4">
          <div className="flex flex-row mb-4 items-center">
            <Icon
              name="HiOutlineBriefcase"
              size={20}
              className="text-black mr-3"
            />
            Senior software developer
          </div>
          <Player
            className="flex-none rounded-2xl shadow-sm overflow-hidden w-full"
            width="100%"
            height={450}
            fluid={false}
            playsInline
            autoPlay={true}
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
          <div className="flex justify-between mt-4 mb-4 md:mb-10">
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
                  <Icon name="HiMail" size={30} className="text-black mr-3" />
                  <Linkedin width={20} />
                </div>
                <p className="text-2xl">Lorem ipsum</p>
                <p className="text-xs text-gray-500 max-w-[300px]">
                  Lorem ipsum dolor sit lorem dolor sum dolor sit lorem Lorem
                  ipsum dolor sit lorem dolor sum dolor sit lorem
                </p>
              </div>
            </div>
            <div className="flex-none hidden md:block">
              <div className="grid grid-cols-2 grid-rows-1 gap-4 border-2 p-2 rounded-full">
                <Icon name="HiThumbDown" size={50} className="text-black" />
                <Icon name="HiThumbUp" size={50} className="text-black" />
              </div>
            </div>
            <Icon name="HiBookmark" size={40} className="text-black" />
          </div>
          <div className="block md:hidden flex justify-center mb-6">
            <div className="grid grid-cols-2 grid-rows-1 gap-4 border-2 p-2 rounded-full">
              <Icon name="HiThumbDown" size={50} className="text-black" />
              <Icon name="HiThumbUp" size={50} className="text-black" />
            </div>
          </div>
          <div className="border">
            <Document file="/cv.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              {pages.map((index) => (
                <Page pageNumber={index} width={598} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
