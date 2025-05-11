import Button from "./Button";
import { Link } from "react-router-dom";

const ReuseableSection = ({
  image,
  icon,
  reverse,
  title,
  body,
  buttonText,
}) => {
  return (
    <article className={`md:flex  ${reverse && "flex-row-reverse"} gap-x-28`}>
      {/* Header Section */}
      <div className="w-full mb-12 md:mb-0 md:w-2/4">
        <img
          src={image}
          alt="Section image"
          className="h-auto rounded-xl block mx-auto"
        />
      </div>
      <div className="w-full md:w-3/4">
        <img
          src={icon}
          alt="app-screenshot"
          className="w-24 h-auto mb-6 md:mb-12"
        />
        <h1 className="text-5xl font-bold mb-6 md:mb-12 uppercase">{title}</h1>
        <p className="text-gray-600 text-2xl">{body}</p>
        <div className="mt-6 md:mt-12">
          <Link to="/register" className="block">
            <Button className="capitalize">{buttonText}</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ReuseableSection;
