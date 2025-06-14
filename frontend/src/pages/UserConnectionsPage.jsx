import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const UserConnectionsPage = () => {
  const [userConnections, setUserConnections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConnections = async () => {
      setLoading(true);
      try {
        const res = await api.get("/listings/interaction/");
        console.log(res);
        setUserConnections(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getConnections();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-2 text-xl font-semibold">
        Opportunities you have connected with
      </h1>
      <ul>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner color="black" size="6" />
          </div>
        ) : userConnections.length > 0 ? (
          <ul>
            {userConnections.map((connection) => (
              <li
                className="bg-white border-b p-2 border-gray-200 hover:bg-gray-100"
                key={connection.id}
              >
                {">"} You connection request for{" "}
                <span className="font-semibold text-blue-700 hover:underline">
                  <Link to={`/listing/${connection.service}`}>
                    {" "}
                    {connection.title}
                  </Link>
                </span>{" "}
                sent
                <span className="ml-1 align-middle text-sm font-normal text-gray-500">
                  {formatDistanceToNow(new Date(connection.created), {
                    addSuffix: true,
                  })}
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
