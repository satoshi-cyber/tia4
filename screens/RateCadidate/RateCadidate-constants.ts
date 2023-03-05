import { Answer } from "@/graphql";
import { getAssetUrl } from "@/lib";

export const DEMO_INTERVIEW = {
  date: new Date(),
  jobTitle: 'Receptionist',
  name: 'Hanna Hoover',
  resume: getAssetUrl('/sample-cv.pdf'),
  avatarUrl: getAssetUrl('/avatar.jpeg'),
  answers: [{ question: { question: "Tell me about yourself" }, url: getAssetUrl('/videoplayback.mp4') }] as Answer[],
  emailLink: `mailto:info@theinterview.io`
}
