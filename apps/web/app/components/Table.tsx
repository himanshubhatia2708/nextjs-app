"use client";
import DataGrid, {
  Item,
  Column,
  Editing,
  Form,
  Popup,
  Button as Btn,
} from "devextreme-react/data-grid";
import RadioGroup from "devextreme-react/radio-group";
import "./table.css";
import { data } from "../../data/organization";

type EditFieldType = {
  dataField: string;
  type?: string;
  items?: string[];
};

interface TableFields {
  columns: string[];
  editable: boolean;
  editingMode: string;
  editFields: EditFieldType[];
}

// Define the props interface for the Table component
interface TableProps {
  tableFields: TableFields;
}

const Table: React.FC<TableProps> = ({ tableFields }) => {
  return (
    <DataGrid
      dataSource={data}
      allowColumnReordering={true}
      defaultColumns={tableFields.columns}
      showBorders={true}
      showColumnLines={true}
    >
      <Editing
        mode={tableFields.editingMode}
        useIcons={true}
        allowUpdating={tableFields.editable}
      >
        <Popup
          showTitle={true}
          title="Edit Organization"
          width={400}
          height="100%"
          position={{ my: "top right", at: "top right", of: window }}
        />
        <Form>
          {tableFields.editFields.map(({ type, dataField, items }) => (
            <Item dataField={dataField} key={dataField}>
              {type === "radio" && <RadioGroup items={items} />}
            </Item>
          ))}
        </Form>
      </Editing>
      <Column type="buttons" caption="Actions">
        <Btn icon="edit" />
      </Column>
    </DataGrid>
  );
};

export default Table;
