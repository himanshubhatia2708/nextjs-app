import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/utils/auth";
import Table from "@/components/Organization/Table";
import Image from "next/image";
import { tableFields } from "@/utils/constants";
import { getOrganization } from "@/components/Organization/service";

export default async function Dashboard() {

    if (!await isAuthenticated()) {
        revalidatePath('/');
        redirect("/")
    }

    const response = await getOrganization();

    return (
        <div className={styles.page}>
            
            <main className={styles.main}>
                <Image
                    src="/icons/organization.svg"
                    width={33}
                    height={30}
                    alt="organization"
                />
                <span>Customer Organizations</span>
            </main>
            <div className={styles.table}>
                <Table
                    tableFields={tableFields}
                    data={response}
                />
            </div>
        </div>
    );
}
