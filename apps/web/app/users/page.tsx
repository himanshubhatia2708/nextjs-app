import Table from '../components/Table';
import Button from 'devextreme-react/button';
import Tabs, { Item } from 'devextreme-react/tabs';
import Image from 'next/image';
import styles from './page.module.css';

const ViewUsers = async () => {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          src="/icons/organization.svg"
          width={20}
          height={20}
          alt="Picture of the author"
        />
        <span className="pl-2">Customer Organizations</span>
      </div>
      <Table />
    </div>
  );
};

export default ViewUsers;
