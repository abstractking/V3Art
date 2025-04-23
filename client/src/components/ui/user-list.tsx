import { useQuery } from "@tanstack/react-query";

const UserList = () => {
  const { data: users, isLoading, error } = useQuery<{ id: number; username: string; walletAddress: string }[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Username</th>
          <th className="border px-4 py-2">Wallet Address</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: { id: number; username: string; walletAddress: string }) => (
          <tr key={user.id}>
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.walletAddress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;