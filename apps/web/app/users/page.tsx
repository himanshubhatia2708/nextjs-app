import Table from "../components/Table";
import Image from "next/image";
import styles from "./page.module.css";
import { tableFields } from "./constants";
import ToolbarComponent from "../components/toolBarOtions";

const ViewUsers = async () => {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          src="/icons/organization.svg"
          width={20}
          height={20}
          alt="organization"
        />
        <span className="pl-2">Customer Organizations</span>
      </div>
      <ToolbarComponent />
      <Table tableFields={tableFields} />
    </div>
  );
};

export default ViewUsers;
