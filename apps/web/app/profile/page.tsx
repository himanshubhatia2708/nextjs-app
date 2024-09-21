import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/utils/auth";

export default async function Profile() {

    if (!await isAuthenticated()) {
        revalidatePath('/');
        redirect("/")
    }


    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div>
                    Profile page
                </div>
            </main>
        </div>
    );
}
