import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import moment from "moment";
import { Link } from "react-router-dom";

const UserConnectionsPage = () => {
  const [userConnections, setUserConnections] = useState({});

  useEffect(() => {
    const getConnections = async () => {
      try {
        const res = await api.get("/listings/interaction/");
        setUserConnections(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getConnections();
  }, []);

  return (
    <div className="max-w-lg md:mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-2 text-xl font-semibold">
        Opportunities you have connected with
      </h1>
      <ul>
        {userConnections && userConnections.length > 0 ? (
          <ul>
            {userConnections.map((connection) => (
              <li
                className="bg-white border-b p-2 border-gray-200 hover:bg-gray-100"
                key={connection.id}
              >
                {">"} You connection request for{" "}
                <span className="font-semibold text-blue-700 hover:underline">
                  <Link to={`/listing/${connection.id}`}>
                    {" "}
                    {connection.title}
                  </Link>
                </span>{" "}
                sent
                <span className="ml-1 align-middle text-sm font-normal text-gray-500">
                  {moment(connection.created, "DD MMM YYYY, h:mm A").fromNow()}
                </span>{" "}
                {connection.state === 2 ? (
                  <span>
                    is <span className="font-bold">pending</span> acceptance
                    &#8987;
                  </span>
                ) : connection.state === 1 ? (
                  <span>
                    has been
                    <span className="font-semibold text-green-700">
                      {" "}
                      accepted{" "}
                    </span>
                    &#x2705;
                  </span>
                ) : (
                  <span>
                    has been{" "}
                    <span className="font-semibold text-red-700">rejected</span>{" "}
                    &#10060;
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <li>You have not sent any connection request yet!</li>
        )}
      </ul>
    </div>
  );
};

export default UserConnectionsPage;
