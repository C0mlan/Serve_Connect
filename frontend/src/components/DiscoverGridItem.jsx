import React from "react";

const DiscoverGridItem = ({ image, title, body }) => {
  return (
    <article className="bg-white py-6 px-4 rounded-lg shadow-md border border-gray-200 hover:border-black hover:shadow-lg">
      <div className="flex flex-col gap-y-4 text-center justify-between px-4 md:px-6 py-3 rounded-lg">
        <img
          src={image}
          alt="Discover grid item image"
          className="w-28 h-28 object-cover block mx-auto"
        />

        <h2 className="text-xl md:text-2xl font-bold uppercase">{title}</h2>
        <p className="text-gray-600">{body}</p>
      </div>
    </article>
  );
};

export default DiscoverGridItem;
