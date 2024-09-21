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
  SearchPanel,
  Toolbar as GridToolbar,
  DataGridRef,
} from "devextreme-react/data-grid";
import Image from "next/image";
import { Popup as MainPopup } from "devextreme-react/popup";
import { Form as CreateForm, SimpleItem } from "devextreme-react/form";
import { Button as Btn } from "devextreme-react/button";
import { getTimeZones } from "devextreme/time_zone_utils";
import RadioGroup from "devextreme-react/radio-group";
import "./table.css";
import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";
import styles from "./table.module.css";
import {
  editOrganization,
  // deleteOrganization,
} from "@/components/Organization/service";

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

interface DataFields {
  name: string;
  email: string;
  status: string;
}

interface TableProps {
  tableFields: TableFields;
  renderCreateOrganization: React.FC;
  data: DataFields;
}

const Table: React.FC<TableProps> = ({
  tableFields,
  renderCreateOrganization,
  data,
}) => {
  const timeZones = getTimeZones(new Date());
  const [deletePopup, showDeletePopup] = useState(-1);
  const [deleteVal, setDelete] = useState({ delete: "" });
  const [createPopupVisible, setCreatePopupVisibility] = useState(false);

  const formFieldDataChanged = (e) => {
    // console.log("qwqw", e.component.option("formData"));
    console.log("qw", e);
    setDelete({ delete: e.value });
  };

  const deleteOrganizationData = async () => {
    // await deleteOrganization(id);
    window.location.reload();
  };

  const renderContent = () => {
    return (
      <>
        <p>Type ‘delete’ in the field below</p>
        <CreateForm
          elementAttr={{ class: "mb-1 mt-2" }}
          onFieldDataChanged={formFieldDataChanged}
        >
          <SimpleItem dataField="" editorType="dxTextBox" />
        </CreateForm>
        <Btn
          text="Delete"
          onClick={() => showDeletePopup(-1)}
          elementAttr={{ class: "btn_primary" }}
          disabled={deleteVal.delete !== "delete"}
        />
        <Btn
          text="Cancel"
          elementAttr={{ class: "btn_secondary" }}
          onClick={() => deleteOrganizationData()}
        />
      </>
    );
  };

  const grid = useRef<DataGridRef>(null);

  const saveOptions = useMemo(() => {
    return {
      text: "Save",
      onClick: async () => {
        const gridInstance = grid.current!.instance;
        const values = gridInstance().option("editing.editRowKey");
        await editOrganization(values);
        window.location.reload();
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
        showDeletePopup(rowIndex);
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
            title={`Edit ${grid.current?.instance()?.option("editing.editRowKey")?.organizationName}`}
            width={400}
            height="100%"
            position={{ my: "top right", at: "top right", of: window }}
            showCloseButton={true}
            wrapperAttr={{ class: "edit-popup" }}
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
        <GridToolbar>
          <Item location="after">
            <Btn
              text="Create Organization"
              icon="plus"
              className={`${styles.button_primary} mr-2.5`}
              render={(buttonData) => (
                <>
                  <Image
                    src="/icons/plus.svg"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <span className="pl-2">{buttonData.text}</span>
                </>
              )}
              onClick={() => setCreatePopupVisibility(true)}
            />
            <MainPopup
              title="Create Organization"
              visible={createPopupVisible}
              contentRender={renderCreateOrganization}
              width={400}
              height="100%"
              position={{ my: "top right", at: "top right", of: window }}
              onHiding={() => setCreatePopupVisibility(false)}
              showCloseButton={true}
            />
          </Item>
          <Item location="after">
            <Btn
              text="Filter"
              icon="filter"
              className={styles.button_primary}
              render={() => (
                <>
                  <Image
                    src="/icons/filter.svg"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <span className="pl-2">Filter</span>
                </>
              )}
            />
          </Item>
          <Item name="searchPanel" />
        </GridToolbar>
        <SearchPanel visible={true} highlightCaseSensitive={true} />
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
