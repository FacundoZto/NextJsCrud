import Image from "next/image";
import style from "./TopBar.module.css";
const TopBar = () => {
  return (
    <header className={style.header}>
      <Image src="/logo.png" alt="logo" width={45} height={45} />
    </header>
  );
};

export default TopBar;
