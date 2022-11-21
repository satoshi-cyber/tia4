import Avatar from 'react-avatar'

import MainMenu from '../components/Menu'
import { Text, Icon, Field, FormIcon, Form } from '../components'
import { Player, ControlBar } from 'video-react'
import 'video-react/dist/video-react.css'
import { useForm } from 'react-hook-form'

export default function Submit() {
  const form = useForm()

  const onSubmit = () => {}

  return (
    <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
      <MainMenu />
      <div className="flex flex-col sm:max-w-[600px] lg:max-w-[900px] xl:max-w-[1200px]  w-full px-4 items-center">
        <Text
          text="Video archive"
          className="text-3xl flex-1 text-center ml-[30px] mb-3"
        />
        <Text
          className="text-lg text-gray-500 mb-10"
          text="Search, watch video archives, and re-rate them if you want!"
        />
        <div className="sticky top-0 pt-4 mb-20 w-full bg-white z-20">
          <Form
            form={form}
            onSubmit={onSubmit}
            className="w-full border-b pb-3"
          >
            <div className="flex flex-row justify-between w-full">
              <div className="w-[400px]">
                <Field.Input
                  label="Search"
                  placeholder="Search"
                  type="search"
                  name="search"
                  after={<FormIcon name="HiSearch" />}
                />
              </div>
              <div className="flex flex-row">
                <div className="mr-8">
                  <Field.Select
                    label="Score"
                    name="score"
                    options={[
                      { label: 'All', value: 1 },
                      { label: '4/4', value: 1 },
                      { label: '3/4', value: 1 },
                      { label: '2/4', value: 1 },
                      { label: '1/4', value: 1 },
                    ]}
                    after={<FormIcon name="HiStar" />}
                  />
                </div>
                <Field.Select
                  label="Label"
                  name="label"
                  after={<FormIcon name="HiBookmark" />}
                  options={[
                    { label: 'All', value: 1 },
                    { label: 'future consider', value: 1 },
                  ]}
                />
              </div>
            </div>
          </Form>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full"
              width="100%"
              height={200}
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1080282788/preview/stock-footage-asia-woman-micro-influencer-record-live-viral-video-camera-at-home-studio-happy-youtuber-fun-talk.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>

            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar name="Aliquam gravida" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Aliquam gravida</p>
                  <div>
                    <p className="text-xs mb-2">score: N/A</p>
                  </div>
                </div>
              </div>
              <Icon name="HiStar" size={30} className="text-black" />
            </div>
          </div>
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full"
              width="100%"
              height={200}
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1016315842/preview/stock-footage-happy-reporter-gives-interview-for-video-camera-street-roof-k.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar name="Mauris egestas" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Mauris egestas</p>
                  <div>
                    <p className="text-xs mb-2">score: 1/4</p>
                    <span className="text-[10px] border p-1 rounded-full px-2 mr-2">
                      future consider
                    </span>
                    <span className="text-[10px] border p-1 rounded-full px-2">
                      another label
                    </span>
                  </div>
                </div>
              </div>
              <Icon name="HiOutlineRefresh" size={30} className="text-black" />
            </div>
          </div>
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full"
              width="100%"
              height={200}
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1089223999/preview/stock-footage-happy-pretty-caucasian-girl-smiling-face-and-talking-to-webcam-make-video-call-at-home-talking.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar src="/avatar.jpeg" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Phasellus tincidunt</p>
                  <div>
                    <p className="text-xs mb-2">score: 3/4</p>
                  </div>
                </div>
              </div>
              <Icon name="HiOutlineRefresh" size={30} className="text-black" />
            </div>
          </div>
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full"
              width="100%"
              height={200}
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1025338715/preview/stock-footage-cute-african-american-girl-in-a-video-conference-with-her-cellphone.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar name="Nam semper" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Nam semper</p>
                  <div>
                    <p className="text-xs mb-2">score: 3/4</p>
                    <span className="text-[10px] border p-1 rounded-full px-2 -mr-2">
                      future consider
                    </span>
                  </div>
                </div>
              </div>
              <Icon name="HiOutlineRefresh" size={30} className="text-black" />
            </div>
          </div>
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full"
              width="100%"
              height={200}
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1014304955/preview/stock-footage-adult-bearded-man-vlogging-with-his-camera-on-yellow-orange-background-modern-lifestyle.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar name="Posuere Neque" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Posuere Neque</p>
                  <div>
                    <p className="text-xs mb-2">score: 3/4</p>
                    <span className="text-[10px] border p-1 rounded-full px-2 -mr-2">
                      future consider
                    </span>
                  </div>
                </div>
              </div>
              <Icon name="HiOutlineRefresh" size={30} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
