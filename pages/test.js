import { useRouter } from "next/router";
import { addHook, useLoadData, useGet } from "../lib/service";
import { Magic } from "magic-sdk";

const magic =
  typeof window !== "undefined" &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);

const Anime = {
  Quotes: "quotes",
  NewAnime: "new-anime",
};

addHook(Anime.Quotes, (name) =>
  useGet(`https://animechan.vercel.app/api/quotes/character?name=${name}`)
);

addHook(Anime.NewAnime, (data) => {
  const post = usePost(data);
  const router = useRouter();

  return async () => {
    const res = await post();

    router.push("/login");

    return res;
  };
});

//////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////

// const Action = ({ children, action }) => {
//   const method = useHook(action);

//   return React.cloneElement(children, { onClick: method });
// };

// const ActionFlags = ({ children, action }) => {
//   const method = useHook(action);

//   return React.cloneElement(children, { onClick: method });
// };

export default function Submit() {
  const { data } = useLoadData([Anime.Quotes, "saitama"]);

  if (!data) return "is loading";

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      {JSON.stringify(data)}
    </div>
  );
}
