import Avatar from 'react-avatar';
import { withAuth } from '@/hocs';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import { useForm } from 'react-hook-form';

import { Field, FormIcon, Form, Title, Layout } from '../../components';

const Archive = () => {
  const form = useForm();

  const onSubmit = () => {};

  return (
    <Layout.Default width="sm:max-w-[600px] lg:max-w-[900px]">
      <Title
        title="Candidates"
        subTitle="Search, watch interviews, and review candidates!"
      />
      <div className="md:sticky md:top-0 md:pt-2 mb-20 w-full bg-white z-10">
        <Form form={form} onSubmit={onSubmit} className="w-full border-b pb-3">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex flex-1 md:mr-8 md:max-w-[400px] md:-mb-4">
              <Field.Input
                label="Search"
                placeholder="ex: score: 70% - 90%"
                type="search"
                name="search"
                after={<FormIcon name="HiSearch" />}
              />
            </div>
            <div className="flex -mb-4">
              <Field.Select
                label="Job"
                name="job"
                after={<FormIcon name="HiOutlineBriefcase" />}
                options={[
                  { label: 'All', value: 1 },
                  { label: 'Career Highlight Reel', value: 1 },
                ]}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div>
          <Player
            className="flex-none rounded-xl overflow-hidden w-full"
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
                  <p className="text-xs mb-2">score: 0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Player
            className="flex-none rounded-xl overflow-hidden w-full"
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
                  <p className="text-xs mb-2">score: 80%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Player
            className="flex-none rounded-xl overflow-hidden w-full"
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
                  <p className="text-xs mb-2">score: 90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Player
            className="flex-none rounded-xl overflow-hidden w-full"
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
                  <p className="text-xs mb-2">score: 75%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Player
            className="flex-none rounded-xl overflow-hidden w-full"
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
                  <p className="text-xs mb-2">score: 25%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout.Default>
  );
};

export default withAuth(Archive);
