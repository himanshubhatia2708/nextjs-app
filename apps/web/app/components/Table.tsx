"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import DataGrid, {
  Item,
  Column,
  Editing,
  Form,
  Popup,
  Button,
  RequiredRule,
} from "devextreme-react/data-grid";
import { Popup as MainPopup } from "devextreme-react/popup";
import {
  Form as CreateForm,
  RequiredRule as Required,
  SimpleItem,
} from "devextreme-react/form";
import { Button as Btn } from "devextreme-react/button";
import { getTimeZones } from "devextreme/time_zone_utils";
import RadioGroup from "devextreme-react/radio-group";
import "./table.css";
import { data } from "../../data/organization";
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
  const [deletePopup, showDeletePopup] = useState(-1);

  const renderContent = () => {
    return (
      <>
        <p>Type ‘delete’ in the field below</p>
        <CreateForm elementAttr={{ class: "mb-1 mt-2" }}>
          <SimpleItem dataField="">
            <Required message="Type 'delete' to proceed" />
          </SimpleItem>
        </CreateForm>
        <Btn
          text="Delete"
          onClick={() => showDeletePopup(-1)}
          elementAttr={{ class: "btn_primary" }}
          // disabled={}
        />
        <Btn
          text="Cancel"
          elementAttr={{ class: "btn_secondary" }}
          // onClick={togglePopup}
        />
      </>
    );
  };

  const grid = useRef<DataGrid>(null);
  const saveOptions = useMemo(() => {
    return {
      text: "Save",
      onClick: () => {
        grid.current!.instance().saveEditData();
      },
    };
  }, []);
  const cancelOptions = useMemo(() => {
    return {
      text: "Cancel",
      onClick: () => {
        grid.current!.instance().cancelEditData();
      },
    };
  }, []);
  const deleteOptions = useMemo(() => {
    return {
      text: "Delete",
      onClick: () => {
        const gridInstance = grid.current!.instance;
        const rowKey = gridInstance().option("editing.editRowKey");
        const rowIndex = gridInstance().getRowIndexByKey(rowKey);
        console.log(rowIndex);
        showDeletePopup(rowIndex);
        // grid.current!.instance().deleteRow(rowIndex);
      },
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
          cssClass="button_form_seconday"
          options={cancelOptions}
        ></ToolbarItem>
        <ToolbarItem
          widget="dxButton"
          cssClass="btnform"
          location="after"
          options={deleteOptions}
        ></ToolbarItem>
      </Toolbar>
    );
  }, [saveOptions, cancelOptions, deleteOptions]);

  return (
    <>
      <DataGrid
        dataSource={data}
        defaultColumns={tableFields.columns}
        showBorders={true}
        showColumnLines={true}
        ref={grid}
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
            {tableFields.editFields.map(
              ({ type, dataField, items, required }) =>
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
            <Item colSpan={2} itemType="simple" render={formToolbar} />
          </Form>
        </Editing>
        <Column type="buttons" caption="Actions">
          <Button icon="edit" />
        </Column>
      </DataGrid>
      <MainPopup
        title="Are you sure, you want to delete Fauxbio?"
        wrapperAttr={{ class: "delete-popup" }}
        visible={deletePopup !== -1}
        width="auto"
        height="auto"
        onHiding={() => showDeletePopup(-1)}
        contentRender={renderContent}
        position={{ my: "center", at: "center", of: window }}
      />
    </>
  );
};

export default Table;
