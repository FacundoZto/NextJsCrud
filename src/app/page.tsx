import UserList from '@/components/UserList';
//import SearchBar from '@/components/SearchBar/SearchBar';
import UserModal from '@/components/UserModal';
import { getUsers } from '../services/api';
import style from './page.module.css';

const Home = async () => {
  //const data = await getUsers();

  return (
    <main className={style.main}>
      {/* <SearchBar/> */}
      <UserList />
    </main>
  );
};

export default Home;
