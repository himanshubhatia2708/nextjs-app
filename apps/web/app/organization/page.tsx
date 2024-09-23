import Table from "../../components/Organization/Table";
import Image from "next/image";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/utils/auth";

import styles from "./page.module.css";
import { tableFields } from "@/utils/constants";
import RenderCreateOrganization from "@/components/Organization/createOrganization";
import { getOrganization } from "@/components/Organization/service";

export default async function Organization() {
  if (!(await isAuthenticated())) {
    revalidatePath("/");
    redirect("/");
  }

  const response = await getOrganization();

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          src="/icons/organization.svg"
          width={33}
          height={30}
          alt="organization"
        />
        <span>Customer Organizations</span>
      </div>
      <div className={styles.table}>
        <Table
          tableFields={tableFields}
          renderCreateOrganization={RenderCreateOrganization}
          data={response}
        />
      </div>
    </div>
  );
}
