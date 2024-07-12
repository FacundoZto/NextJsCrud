"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUsers, deleteUser } from "../services/api";
import { User } from "../interfaces/user";
import { Button } from "primereact/button";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserModal from "./UserModal";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
    setFilteredUsers(response);
  };

  const deleteRow = async (id: number) => {
    const response = await deleteUser(id);
    fetchUsers();
  };

  const handleSave = () => {
    fetchUsers();
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const actionBodyTemplate = (rowData: any) => {
    return <Button icon="pi pi-times" onClick={() => deleteRow(rowData.id)} />;
  };
  const nameBodyTemplate = (rowData: any) => {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setEditingUser(rowData);
          setDisplayModal(true);
        }}
      >
        {rowData.usuario}
      </a>
    );
  };
  console.log(searchTerm);
  return (
    <>
      <SearchBar 
      displayModal={displayModal} 
      setDisplayModal={setDisplayModal}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
       />
      <div>
        <DataTable
          value={filteredUsers}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 20]}
          removableSort
        >
          <Column field="id" header="ID" sortable style={{ width: "25%" }} />
          <Column
            field="usuario"
            header="Nombre"
            sortable
            body={nameBodyTemplate}
            style={{ width: "25%" }}
          />
          <Column
            field="estado"
            header="Estado"
            sortable
            style={{ width: "25%" }}
          />
          <Column
            field="sector"
            header="Sector"
            sortable
            style={{ width: "25%" }}
          />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
        <UserModal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          user={editingUser}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default UserList;
