export const CLASS_NAMES = {
    container: "flex flex-1 justify-center relative w-full h-full",
    questionContianer: "absolute z-20 transform-gpu flex flex-col items-center backdrop-blur-2xl bg-black/20 rounded-lg px-3 py-2 m-4 md:max-w-[500px]",
    question: "text-md text-white text-center pointer-events-none transition-all transform-gpu duration-700",
    player: "overflow-hidden z-10"
}

export const PLAYER_PROPS = {
    dblclickable: false,
    width: "100%",
    height: "100%",
    fluid: false,
    playsInline: true,
    controls: true,
    autoPlay: true
}