import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

import Icon from '../../components/Icon';

import Pdf from './components/Pdf';

import { Avatar, ButtonIcon, LoadingProvider, Text } from '@/components';
import { useInterviewQuery } from '@/graphql';
import { useTimeAgo, useUser } from '@/hooks';
import InterviewPlayer from '@/components/InterviewPlayer';
import { isMobile } from 'react-device-detect';

const Div: React.FC<{
  children: React.ReactNode;
  style: object;
  className?: string;
}> = ({ children, ...restProps }) => {
  if (isMobile) return <div {...restProps}>{children}</div>;

  return <motion.div {...restProps}>{children}</motion.div>;
};

const Rate = () => {
  const router = useRouter();

  const { companyId } = useUser();

  const interviewId = router.query.interviewId;

  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1280px)',
  });

  const [{ data, fetching }] = useInterviewQuery({
    variables: { companyId: companyId!, id: interviewId as string },
    pause: !companyId || !interviewId,
  });

  const { scrollY } = useScroll();

  const marginLeft = useTransform(
    scrollY,
    [0, 700],
    [0, isLargeScreen ? 650 : 0]
  );
  const marginRight = useTransform(
    scrollY,
    [0, 700],
    [0, isLargeScreen ? -650 : 0]
  );
  const scale = useTransform(scrollY, [0, 700], [1, isLargeScreen ? 0.7 : 1]);
  const docScale = useTransform(
    scrollY,
    [0, 700],
    [isLargeScreen ? 0.78 : 1, 1]
  );
  const containerMarginRight = useTransform(
    scrollY,
    [0, isLargeScreen ? 700 : 0],
    [0, isLargeScreen ? -450 : 0]
  );
  const containerMarginTop = useTransform(scrollY, [0, 700], [0, 200]);
  const opacity = useTransform(scrollY, [0, 100], [1, isLargeScreen ? 0 : 1]);

  const isLoading = !router.isReady || fetching;

  const answers = data?.interview?.answers;
  const avatarUrl = data?.interview?.interviewee?.avatarUrl;
  const candidateName = `${data?.interview?.interviewee?.firstName} ${data?.interview?.interviewee?.lastName}`;
  const date = useTimeAgo(data?.interview?.createdAt);

  return (
    <LoadingProvider isLoading={isLoading}>
      <div className="flex flex-1 w-full justify-center pt-28 md:pt-16">
        <Div
          style={{
            marginLeft: containerMarginRight,
            marginTop: containerMarginTop,
          }}
        >
          <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
            {interviewId || isLoading ? (
              <div className="flex flex-col lg:max-w-[850px] xl:max-w-[640px] w-full px-6 lg:px-0">
                <Div
                  style={{ marginLeft, marginRight, scale }}
                  className="xl:sticky xl:top-28 xl:top-16 z-10 origin-top pt-6"
                >
                  <div>
                    <Div
                      className="flex flex-row mb-4 items-center"
                      style={{ opacity }}
                    >
                      <Icon
                        name="HiOutlineBriefcase"
                        size={20}
                        className="text-black mr-3"
                      />
                      <Text
                        text="Senior software developer"
                        className="text-lg"
                        skeletonProps={{ width: 180 }}
                      />
                    </Div>
                    <InterviewPlayer answers={answers} />
                    <Div
                      className="flex justify-between mt-4 mb-4 md:mb-10"
                      style={{ opacity }}
                    >
                      <div className="flex flex-1 md:flex-none">
                        <div className="flex flex-row flex-1">
                          <div className="mr-4">
                            <Avatar
                              size={50}
                              alt={candidateName}
                              name={candidateName}
                              src={avatarUrl || ''}
                              className="rounded-full border"
                            />
                          </div>
                          <div>
                            <Text
                              className="text-xl"
                              text={candidateName}
                              skeletonProps={{ width: 130 }}
                            />
                            <Text
                              className="text-sm text-gray-500 max-w-[300px] mb-2"
                              skeletonProps={{ width: 60 }}
                              text={date}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row ml-4">
                          <ButtonIcon
                            circle={false}
                            name="HiMail"
                            size={30}
                            className="text-gray-800 mr-3"
                          />
                          <ButtonIcon
                            circle={false}
                            name="HiLinkedin"
                            size={30}
                            className="text-gray-800"
                          />
                        </div>
                      </div>
                      <div className="flex-none hidden md:block">
                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                          <ButtonIcon size={60} name="HiThumbDown" />
                          <ButtonIcon size={60} name="HiThumbUp" />
                        </div>
                      </div>
                    </Div>
                    <div className="block md:hidden flex justify-center mb-6">
                      <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        <ButtonIcon size={60} name="HiThumbDown" />
                        <ButtonIcon size={60} name="HiThumbUp" />
                      </div>
                    </div>
                  </div>
                </Div>

                <Div
                  className="origin-top hidden lg:block"
                  style={{ scale: docScale }}
                >
                  <Pdf src="/awesome-cv.pdf" />
                </Div>
              </div>
            ) : (
              <div>empty screen</div>
            )}
          </div>
        </Div>
      </div>
    </LoadingProvider>
  );
};

export default Rate;
