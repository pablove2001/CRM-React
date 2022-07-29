import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientForm from "../components/ClientForm";

const EditClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`;
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

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
      <p className="mt-3">Use this form to edit data of a client</p>
      {client?.names ? (
        <ClientForm client={client} loading={loading} />
      ) : (
        <p>Invalid Client ID</p>
      )}
    </>
  );
};

export default EditClient;
