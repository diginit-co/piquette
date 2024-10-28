import Column from "~/components/templates/column";
import { HeaderComponent } from "~/components/common";

export default async function DocumentsPage () {
    return (
        <Column>
            <HeaderComponent title="Documents" description="A collection of your documents" />
            <div>
                <p>Coming Soon!</p>
            </div>
        </Column>
    )
}