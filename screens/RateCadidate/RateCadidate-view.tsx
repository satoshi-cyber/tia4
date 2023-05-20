import React from 'react';
import InterviewPlayer from '@/components/InterviewPlayer';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import LoadingProvider from '@/context/LoadingProvider';
import Avatar from '@/components/Avatar';
import ButtonIcon from '@/components/ButtonIcon';

import Pdf from './components/Pdf';
import { useRate } from './RateCadidate-hook';
import AnimatedDiv from './components/AnimatedDiv';
import Rate from './components/Rate';

const RateCandidate = () => {
  const {
    isLoading,
    transforms: {
      containerMarginRight,
      containerMarginTop,
      marginLeft,
      marginRight,
      scale,
      opacity,
      docScale,
    },
    resume,
    resumeLink,
    jobTitle,
    messageUrl,
    answers,
    candidateName,
    linkedinProfile,
    avatarUrl,
    date,
  } = useRate();

  return (
    <LoadingProvider isLoading={isLoading}>
      <div className="flex flex-1 w-full justify-center pt-28 md:pt-16">
        <AnimatedDiv
          style={{
            marginLeft: containerMarginRight,
            marginTop: containerMarginTop,
          }}
        >
          <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
            <div className="flex flex-col lg:max-w-[850px] xl:max-w-[640px] w-full px-6 lg:px-0">
              <AnimatedDiv
                style={{ marginLeft, marginRight, scale }}
                className="xl:sticky xl:top-16 z-10 origin-top"
              >
                <div>
                  <AnimatedDiv
                    className="flex flex-row mb-4 items-center"
                    style={{ opacity }}
                  >
                    <Icon
                      name="HiOutlineBriefcase"
                      size={20}
                      className="text-black mr-3"
                    />
                    <Text
                      text={jobTitle}
                      className="text-lg"
                      skeletonProps={{ width: 180 }}
                    />
                  </AnimatedDiv>
                  <InterviewPlayer answers={answers} />
                  <AnimatedDiv
                    className="flex justify-between mt-4 mb-10"
                    style={{ opacity }}
                  >
                    <div className="flex flex-1 md:flex-none">
                      <div className="flex flex-row flex-1">
                        <div className="mr-4">
                          <Avatar
                            size={50}
                            text={candidateName}
                            src={avatarUrl || ''}
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
                      <div className="ml-3 grid gap-3 grid-flow-col auto-cols-max">
                        {resumeLink && (
                          <Link
                            href={resumeLink}
                            target="_blank"
                            className="block lg:hidden"
                          >
                            <ButtonIcon
                              circle={false}
                              name="HiOutlineDocument"
                              size={30}
                              className="text-gray-800"
                            />
                          </Link>
                        )}
                        <Link href={messageUrl} target="_blank">
                          <ButtonIcon
                            circle={false}
                            name="HiMail"
                            size={30}
                            className="text-gray-800"
                          />
                        </Link>
                        {(isLoading || linkedinProfile) && (
                          <Link href={linkedinProfile || '#'} target="_blank">
                            <ButtonIcon
                              circle={false}
                              name="HiLinkedin"
                              size={30}
                              className="text-gray-800"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="hidden md:flex flex-row items-start">
                      <Rate />
                    </div>
                  </AnimatedDiv>
                  <div className="flex md:hidden flex justify-center mb-12 flex-row items-center">
                    <Rate size={36} />
                  </div>
                </div>
              </AnimatedDiv>
              {resume && (
                <AnimatedDiv
                  className="origin-top hidden lg:block"
                  style={{ scale: docScale }}
                >
                  <Pdf src={resume} />
                </AnimatedDiv>
              )}
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </LoadingProvider>
  );
};

export default RateCandidate;
