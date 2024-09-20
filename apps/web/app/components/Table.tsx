"use client";
import { useCallback, useMemo } from "react";
import DataGrid, {
  Item,
  Column,
  Editing,
  Form,
  Popup,
  Button,
  RequiredRule,
} from "devextreme-react/data-grid";
import RadioGroup from "devextreme-react/radio-group";
import "./table.css";
import { data } from "../../data/organization";
import { getTimeZones } from "devextreme/time_zone_utils";
import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";

type EditFieldType = {
  dataField: string;
  type?: string;
  items?: string[];
  required?: string;
};

interface TableFields {
  columns: string[];
  editable: boolean;
  editingMode: string;
  editFields: EditFieldType[];
}

interface TableProps {
  tableFields: TableFields;
}

const Table: React.FC<TableProps> = ({ tableFields }) => {
  const timeZones = getTimeZones(new Date());

  // const grid = useRef<DataGrid>(null);
  const saveOptions = useMemo(() => {
    return {
      text: "Save",
      // onClick: (e:ClickEvent) => {
      //     grid.current!.instance.saveEditData();
      // },
    };
  }, []);
  const cancelOptions = useMemo(() => {
    return {
      text: "Cancel",
      // onClick: (e:ClickEvent)=>{
      //     grid.current!.instance.cancelEditData();
      // },
    };
  }, []);
  const copyOptions = useMemo(() => {
    return {
      text: "Delete",
      // onClick: (e:ClickEvent) => {
      //     const gridInstance = grid.current!.instance;
      //     const rowKey = gridInstance.option("editing.editRowKey");
      //     const rowIndex = gridInstance.getRowIndexByKey(rowKey);
      //     const name = gridInstance.cellValue(rowIndex, "FirstName");
      //     const message = name ? name+"'s ":"";
      //     notify(`Copy ${message}data`);
      // },
    };
  }, []);

  const formToolbar = useCallback(() => {
    return (
      <Toolbar>
        <ToolbarItem
          widget="dxButton"
          location="before"
          cssClass="btnform"
          options={saveOptions}
        ></ToolbarItem>
        <ToolbarItem
          widget="dxButton"
          location="before"
          options={cancelOptions}
        ></ToolbarItem>
        <ToolbarItem
          widget="dxButton"
          cssClass="btnform"
          location="after"
          options={copyOptions}
        ></ToolbarItem>
      </Toolbar>
    );
  }, [saveOptions, cancelOptions, copyOptions]);

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
          showCloseButton={true}
        />
        <Form>
          {tableFields.editFields.map(({ type, dataField, items, required }) =>
            type !== "dxSelectBox" ? (
              <Item dataField={dataField} key={dataField}>
                {type === "radio" && <RadioGroup items={items} />}
                {required && <RequiredRule message={required} />}
              </Item>
            ) : (
              <Item
                dataField={dataField}
                key={dataField}
                editorType="dxSelectBox" // Using SelectBox as an editor
                editorOptions={{
                  dataSource: timeZones,
                  placeholder: "Select a time zone",
                  searchEnabled: true, // Enable searching in the dropdown
                  displayExpr: "title", // Display the timezone string
                  valueExpr: "title", // Use the timezone string as the value
                }}
              />
            )
          )}
          <Item colSpan={2} itemType="simple" render={formToolbar}></Item>
        </Form>
      </Editing>
      <Column type="buttons" caption="Actions">
        <Button icon="edit" />
      </Column>
    </DataGrid>
  );
};

export default Table;
