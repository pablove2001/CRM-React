import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ViewClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getClientAPI();
  }, []);
  return loading ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No results found</p>
  ) : (
    <div>
      {loading ? (
        "loading..."
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            View Client: {client.names}
          </h1>
          <p className="mt-3">Client Information</p>

          {client.names && (
            <p className="text-2xl text-gray-600 mt-10">
              <span className="text-gray-800 uppercase font-bold">Name: </span>
              {client.names}
            </p>
          )}

          {client.email && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Email: </span>
              {client.email}
            </p>
          )}

          {client.telephone && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Telephone:{" "}
              </span>
              {client.telephone}
            </p>
          )}

          {client.company && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Company:{" "}
              </span>
              {client.company}
            </p>
          )}

          {client.notes && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Notes: </span>
              {client.notes}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewClient;
