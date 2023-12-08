import { useAtomValue } from "jotai";
import { userState } from "../atoms/userAtom";
import { Input } from "@mui/joy";
import { useState } from "react";

import { getGifs } from "../actions/action";

export const Home = () => {
  const [value, setValue] = useState("");
  const currentUser = useAtomValue(userState);
  const [gif, setGif] = useState("");

  const handleSearch = async () => {
    const gifs = await getGifs(value);
    console.log(gifs);
    if (gifs && gifs.data.length > 0) {
      setGif(gifs.data[0].embed_url);
      const storeGif = {
        word: value,
        path: gifs.data[0].embed_url,
        name: currentUser.name,
        accessToken: currentUser.accessToken,
      };
      storeGif(storeGif);
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
    </div>
  );
};
