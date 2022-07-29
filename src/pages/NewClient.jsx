import ClientForm from "../components/ClientForm";

const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-3">Fill in the following fields to register a client</p>
      <ClientForm />
    </>
  );
};

export default NewClient;
