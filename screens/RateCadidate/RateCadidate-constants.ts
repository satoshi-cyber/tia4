import { Answer } from "@/graphql";
import { getAssetUrl } from "@/lib";

export const DEMO_INTERVIEW = {
  name: 'Hanna Hoover',
  resume: getAssetUrl('/sample-cv.pdf'),
  avatarUrl: getAssetUrl('/avatar.jpeg'),
  answers: [{ question: { question: "Tell me about yourself" } }] as Answer[],
  emailLink: `mailto:info@theinterview.io`
}