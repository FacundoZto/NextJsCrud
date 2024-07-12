import { User } from "@/interfaces/user";

const API_URL = 'https://staging.duxsoftware.com.ar/api/personal';
const SECTOR = 6000;

const getUsers = async ( page?: number, limit?: number) => {
  let response;
  //const query = search ? `&q=${search}` : '';

  !page || !limit ? 
  response = await fetch(`${API_URL}?sector=${SECTOR}`) :
  response = await fetch(`${API_URL}?sector=${SECTOR}&_limit=${limit}&_page=${page}`);
  //const totalUsers = response.headers.get('X-Total-Count');
  const users = await response.json();
  return users
  //totalUsers: Number(totalUsers),
};

const createUser = async (user: User) => {
  console.log(user)
  const response = await fetch(`${API_URL}?sector=${SECTOR}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Error creating user');
  }
  return await response.json();
};

const updateUser = async (id: number, user: User) => {
  const response = await fetch(`${API_URL}/${id}?sector=${SECTOR}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Error updating user');
  }
  return await response.json();
};

const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}?sector=${SECTOR}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error deleting user');
  }
  return await response.json();
};

export { getUsers, createUser, updateUser, deleteUser };
