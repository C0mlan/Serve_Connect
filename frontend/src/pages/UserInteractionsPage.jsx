import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import moment from "moment";

const UserInteractionsPage = () => {
  const [userInteractions, setUserInteractions] = useState({});

  useEffect(() => {
    const getInteractions = async () => {
      try {
        const res = await api.get("/listings/interaction/");
        setUserInteractions(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInteractions();
  }, []);

  return (
    <div className="max-w-lg mx-4 md:mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-2 text-xl font-semibold">
        Listings you have interacted with
      </h1>
      <ul>
        {userInteractions && userInteractions.length > 0 ? (
          <ul>
            {userInteractions.map((interaction) => (
              <li
                className="bg-white border-b p-2 border-gray-200 hover:bg-gray-50"
                key={interaction.id}
              >
                {">"} You interacted with listing {interaction.service} with
                reason "{interaction.reason}"{" "}
                {moment(interaction.created, "DD MMM YYYY, h:mm A").fromNow()}
              </li>
            ))}
          </ul>
        ) : (
          <li>You have no interaction</li>
        )}
      </ul>
    </div>
  );
};

export default UserInteractionsPage;
