import {TableComponent} from "~/components/common";
import { exampleConfig } from '~/app/_components/Example/example.config';

export default function ExampleIndex() {
    return (
        <TableComponent config={exampleConfig.table} />
    )
}