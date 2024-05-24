
export const DeleteUser = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";
  const token = sessionStorage.getItem('token');

  const Delete = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={Delete}>
      <label>Delete user</label>
      <label>ID</label>
      <input type="text" name="id" />
      <button type="submit">Delete user</button>
    </form>
  );
};
