import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default function Dashboard() {
    const isAuthenticated = cookies().get('session');
    if (!isAuthenticated) {
        revalidatePath('/');
        redirect('/');
    }
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div>
                    Dashboard page
                </div>
            </main>
        </div>
    );
}
