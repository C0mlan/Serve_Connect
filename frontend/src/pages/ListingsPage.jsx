import { useAuth } from "../contexts/AuthContext";

const ListingsPage = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>ListingsPage</div>;
};

export default ListingsPage;
