import React from "react";

const OpportunityCard = ({ spanText, title, body, image, footer }) => {
  return (
    <article className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:border-black hover:shadow-lg">
      <div className="flex flex-col gap-y-4 justify-between bg-gray-50 px-4 min-h-[460px] md:px-6 py-3 rounded-lg">
        <span className="block mb-2 text-center">{spanText}</span>

        <img
          src={image}
          alt="opoortunityImg"
          className="block mx-auto w-full rounded-2xl mb-4"
        />
        <h1 className="text-4xl font-bold uppercase">{title}</h1>

        <p className="text-gray-600 text-lg">{body}</p>

        <h2 className="text-gray-500 text-md">{footer}</h2>
      </div>
    </article>
  );
};

export default OpportunityCard;
