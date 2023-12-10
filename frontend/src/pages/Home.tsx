import { useAtomValue } from "jotai";
import { userState } from "../atoms/userAtom";
import { Input } from "@mui/joy";
import { useState, useEffect } from "react";

import { getGifs } from "../actions/action";
import { storeGif as storeGifAction, getGifs as getAllGifs } from "../sevices/apis";

export const Home = () => {
  const [value, setValue] = useState("");
  const currentUser = useAtomValue(userState);
  const [gif, setGif] = useState("");
  const [allStoredGifs, setAllStoredGifs] = useState([]);

  useEffect(() => {
    (async () => {
      const allGifs = await getAllGifs();
      setAllStoredGifs(allGifs.gifs);
    })();
  }, [gif]);

  const handleSearch = async () => {
    const gifs = await getGifs(value);
    setValue("");
    if (gifs && gifs.data.length > 0) {
      setGif(gifs.data[0].embed_url);
      const storeGif = {
        word: value,
        path: gifs.data[0].embed_url as string,
      };
      const storedGif = await storeGifAction(storeGif);
      if (!storedGif?.status) alert("Please login to add Gif");
    } else {
      alert("Couldn't get a gif!");
    }
  };

  return (
    <div className="flex items-center  flex-col gap-10">
      <h1 className="text-3xl font-bold text-green-900">Hej!! {currentUser.name} 🐲 </h1>
      <Input
        placeholder="Search gif with a word"
        onChange={(e) => setValue(e.target.value)}
        className="py-2 px-1 w-[300px]"
        value={value}
      />
      <button
        onClick={handleSearch}
        className="bg-yellow-100 px-4 py-2 rounded text-lg font-bold border border-black"
      >
        Search 👻
      </button>

      {gif && (
        <div className="h-80 w-80 relative z-0 mx-auto">
          <iframe
            className="w-full h-full top-0 left-0 z-1 absolute"
            src={gif}
            allow="encrypted-media;"
          ></iframe>
          <div className="w-full h-full border-none top-0 left-0 z-1 absolute"></div>
        </div>
      )}
      <div>
        {allStoredGifs.length > 0 ? (
          <>
            <h3 className="text-blue-600 font-bold text-center text-2xl">
              All your searched gifs 👻
            </h3>
            <div className="flex flex-wrap  gap-3 sm:gap-8 px-4 sm:px-20 py-10 ">
              {allStoredGifs &&
                allStoredGifs.map((gif) => (
                  <div className="h-32 w-32 relative z-0 mx-auto">
                    <iframe
                      className="w-full h-full top-0 left-0 z-1 absolute"
                      src={gif?.path}
                      allow="encrypted-media;"
                    ></iframe>
                    <div className="w-full h-full border-none top-0 left-0 z-1 absolute"></div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <p className="text-center text-purple-600 text-lg font-bold">No Gif stored yet</p>
        )}
      </div>
    </div>
  );
};
