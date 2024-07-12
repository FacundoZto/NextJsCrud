'use client'
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { createUser, updateUser } from '../services/api';
import { User } from '../interfaces/user';

const UserModal = (props: any) => {
  const {displayModal, setDisplayModal, user, onSave} = props;
  const [data, setData] = useState({
    id: 0,
    usuario: '',
    estado: '',
    sector: 0
  });

  //para actualizar el estado data cada vez que el user prop cambie.
  useEffect(() => {
    if (user) {
      setData({
        id: user.id || '',
        usuario: user.usuario || '',
        estado: user.estado || '',
        sector: user.sector || ''
      });
    } else {
      setData({
        id: 0,
        usuario: '',
        estado: '',
        sector: 0
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value
    }))
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      await updateUser(data.id, data);
    } else {
      const created = await createUser(data);
    }
    onSave();
    setDisplayModal(false);
    setData({id: 0,
      usuario: '',
      estado: '',
      sector: 0})
  };

  return (
    <Dialog header="Usuario" visible={displayModal} onHide={() => setDisplayModal(false)} className="p-fluid" style={{width: '50vw'}}>
      <div className="p-field p-grid" style={{marginBottom: '1rem'}}>
        <label htmlFor="id" className="p-col-12 p-md-2">ID</label>
        <div className="p-col-12 p-md-10">
          <InputText id="id" value={data.id ? String(data.id) : ''} onChange={handleChange} />
        </div>
      </div>
      <div className="p-field p-grid" style={{marginBottom: '1rem'}}>
        <label htmlFor="usuario" className="p-col-12 p-md-2">Nombre</label>
        <div className="p-col-12 p-md-10">
          <InputText id="usuario" value={data?.usuario} onChange={handleChange} />
        </div>
      </div>
      <div className="p-field p-grid" style={{marginBottom: '1rem'}}>
        <label htmlFor="estado" className="p-col-12 p-md-2">Estado</label>
        <div className="p-col-12 p-md-10">
          <Dropdown id="estado" value={data?.estado} options={['ACTIVO', 'INACTIVO']} onChange={handleChange} />
        </div>
      </div>
      <div className="p-field p-grid" style={{marginBottom: '1rem'}}>
        <label htmlFor="sector" className="p-col-12 p-md-2">Sector</label>
        <div className="p-col-12 p-md-10">
          <Dropdown id="sector" value={data?.sector} options={[1000, 2000, 3000, 4000, 5000, 6000]} onChange={handleChange} />
        </div>
      </div>
      <div className="p-field p-grid" style={{marginBottom: '1rem'}}>
        <div className="p-col-12 p-md-10 p-offset-md-2" style={{display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '50px'}}>
          <Button label={user ? 'Confirmar' : 'Crear'} icon="pi pi-check" onClick={handleSubmit} className="p-button-primary p-mr-2" 
          style={{width: '140px'}}/>
          <Button label='Cancelar' icon="pi pi-check" onClick={() => setDisplayModal(false)} text raised style={{width: '140px'}}/>
        </div>
      </div>
    </Dialog>
  );
};

export default UserModal;
