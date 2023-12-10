import { Link } from "react-router-dom";

type Props = {
  path: string;
  text: string;
};

export const ButtonLink = ({ path, text }: Props) => {
  return (
    <Link
      to={path}
      className="rounded text-white bg-purple-500 py-2 px-4 text-lg font-bold mx-auto block w-fit animate-bounce"
    >
      {text}
    </Link>
  );
};
