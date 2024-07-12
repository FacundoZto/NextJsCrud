'use client'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import style from "./SearchBar.module.css";

const SearchBar = (props: any) => {
  const { displayModal, setDisplayModal, searchTerm, setSearchTerm } = props;

  return (
    <header>
      <div className={style.title}>
        <h1>Usuarios</h1>
        <Button
          label="Nuevo Usuario"
          icon="pi pi-plus"
          iconPos="left"
          className={style.btn}
          onClick={() => setDisplayModal(!displayModal)}
        />
      </div>
      <div className={style.searchBar}>
        <InputText placeholder="Buscar" className={style.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
    </header>
  );
};

export default SearchBar;
