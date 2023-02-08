export const CLASS_NAMES = {
  container: "transform-gpu flex-none rounded-xl overflow-hidden w-full h-[300px] md:h-[200px] bg-gray-200 relative group hover:shadow-hover",
  video: "absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover rounded-xl drop-shadow-md group-hover:scale-y-110 group-hover:scale-x-110",
  description: "flex justify-between mt-4 mb-4 md:mb-10",
  avatarContainer: "mr-4",
  avatar: "border",
  job: "flex flex-col w-full",
  firstLine: "flex flex-1 justify-between",
  candidateName: "text-lg",
  appliedDate: "text-xs mb-2 text-gray-600",
  score: "text-sm mb-1 text-gray-800"
}

export const VIDEO_PROPS = {
  width: "100%",
  height: "100%",
  playsInline: true,
  controls: false,
  muted: true,
  autoPlay: true,
  loop: true,
}
