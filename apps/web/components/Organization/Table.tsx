"use client";
import { useRef, useState } from "react";
import DataGrid, {
  Item,
  Column,
  // Editing,
  // Form,
  // Popup,
  // Button,
  // RequiredRule,
  SearchPanel,
  Toolbar as GridToolbar,
  DataGridRef,
} from "devextreme-react/data-grid";
import Image from "next/image";
import { Popup as MainPopup, PopupRef } from "devextreme-react/popup";
import { Form as DeleteForm, SimpleItem } from "devextreme-react/form";
import { Button as Btn } from "devextreme-react/button";
// import { getTimeZones } from "devextreme/time_zone_utils";
// import RadioGroup from "devextreme-react/radio-group";
import "./table.css";
// import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";
import styles from "./table.module.css";
import { deleteOrganization } from "./service";
import { OrganizationTableProps } from "@/lib/definition";
// import { CustomPopup } from "@/ui/Popup";
import RenderCreateOrganization from "./createOrganization";
// import EditOrganization from "./editOrganization";
// import CreateOrganizationForm from "./CreateOrganizationForm";

export default function Table({ tableFields, data }: OrganizationTableProps) {
  // const timeZones = getTimeZones(new Date());
  // const [editPopup, showEditPopup] = useState(false);
  const [deletePopup, showDeletePopup] = useState(-1);
  const [deleteVal, setDelete] = useState({ delete: "" });
  const [createPopupVisible, setCreatePopupVisibility] = useState(false);

  const formFieldDataChanged = (e: any) => {
    setDelete({ delete: e.value });
  };

  const deleteOrganizationData = async () => {
    await deleteOrganization(deletePopup);
    window.location.reload();
  };

  const renderContent = () => {
    const gridInstance = grid.current!.instance;
    const rowKey = gridInstance().option("editing.editRowKey");
    return (
      <>
        <div className="title">{`Are you sure, you want to delete ${rowKey?.name}?`}</div>
        <p>Type ‘delete’ in the field below</p>
        <DeleteForm onFieldDataChanged={formFieldDataChanged}>
          <SimpleItem
            dataField="."
            editorOptions={{
              placeholder: "delete",
              class: "delete-input",
            }}
          />
        </DeleteForm>
        <Btn
          text="Delete"
          onClick={() => deleteOrganizationData()}
          elementAttr={{ class: "btn_primary" }}
          disabled={deleteVal.delete !== "delete"}
        />
        <Btn
          text="Cancel"
          onClick={() => showDeletePopup(-1)}
          elementAttr={{ class: "btn_secondary" }}
        />
      </>
    );
  };

  const grid = useRef<DataGridRef>(null);
  const deleteRef = useRef<PopupRef>(null);

  // const saveOptions = useMemo(() => {
  //   return {
  //     text: "Save",
  //     onClick: async () => {
  //       const gridInstance = grid.current!.instance;
  //       const values = gridInstance().option("editing.editRowKey");
  //       await editOrganization(values);
  //       window.location.reload();
  //     },
  //   };
  // }, []);
  // const cancelOptions = useMemo(() => {
  //   return {
  //     text: "Cancel",
  //     onClick: () => {
  //       grid.current!.instance().cancelEditData();
  //     },
  //   };
  // }, []);
  // const deleteOptions = useMemo(() => {
  //   return {
  //     text: "Delete",
  //     onClick: () => {
  //       const gridInstance = grid.current!.instance;
  //       const rowKey = gridInstance().option("editing.editRowKey");
  //       const rowIndex = gridInstance().getRowIndexByKey(rowKey);
  //       showDeletePopup(rowIndex);
  //     },
  //   };
  // }, []);

  // const formToolbar = useCallback(() => {
  //   return (
  //     <Toolbar>
  //       <ToolbarItem
  //         widget="dxButton"
  //         location="before"
  //         cssClass="btnform"
  //         options={saveOptions}
  //       ></ToolbarItem>
  //       <ToolbarItem
  //         widget="dxButton"
  //         location="before"
  //         cssClass="button_form_seconday"
  //         options={cancelOptions}
  //       ></ToolbarItem>
  //       <ToolbarItem
  //         widget="dxButton"
  //         cssClass="btnform"
  //         location="after"
  //         options={deleteOptions}
  //       ></ToolbarItem>
  //     </Toolbar>
  //   );
  // }, [saveOptions, cancelOptions, deleteOptions]);

  // const renderTitle = () => {
  //   const gridInstance = grid.current!.instance;
  //   const rowKey = gridInstance().option("editing.editRowKey");
  //   return <p className={styles.edit_title}>{`Edit ${rowKey?.name}`}</p>;
  // };

  return (
    <>
      {/* {editPopup && (
        <CustomPopup>
          <EditOrganization />
        </CustomPopup>
      )}
      {createPopupVisible && (
        <CustomPopup>
          <CreateOrganizationForm />
        </CustomPopup>
      )} */}
      <DataGrid
        dataSource={data}
        // defaultColumns={tableFields.columns}
        showBorders={true}
        showColumnLines={true}
        ref={grid}
        elementAttr={{ class: styles.table }}
      >
        {tableFields.columns.map((col) =>
          col === "organizationAdmin" ? (
            <Column
              dataField={col}
              key={col}
              minWidth={350}
              cellRender={({ data }) => <span>{data.user.email}</span>}
            />
          ) : col === "projects" || col === "molecules" || col === "users" ? (
            <Column
              dataField={col}
              key={col}
              cellRender={() => (
                <span>{Math.floor(Math.random() * 10) + 1}</span>
              )}
            />
          ) : col === "createdAt" || col === "updatedAt" ? (
            <Column
              key={col}
              dataField={col}
              minWidth={250}
              // cellRender={({ data }) => (
              //   <span>{new Date(data[col]).toLocaleString()}</span>
              // )}
            />
          ) : (
            <Column dataField={col} />
          )
        )}
        <Column
          width={80}
          cellRender={() => (
            <Btn
              elementAttr={{ cssClass: "editBtn" }}
              render={() => (
                <>
                  <Image
                    src="/icons/edit.svg"
                    width={24}
                    height={24}
                    alt="Create"
                  />
                </>
              )}
              // onClick={() => showEditPopup(true)}
            />
          )}
          caption="Actions"
        />
        {/* <Editing
          mode={tableFields.editingMode}
          useIcons={true}
          allowUpdating={tableFields.editable}
        > */}
        {/* <Popup
            titleRender={renderTitle}
            showTitle={true}
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
                    {type === "radio" && (
                      <RadioGroup
                        items={items}
                        // defaultValue={
                        //   grid.current
                        //     ?.instance()
                        //     ?.option("editing.editRowKey")?.[dataField]
                        // }
                      />
                    )}
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
            <Item render={formToolbar} />
          </Form> */}
        {/* </Editing> */}
        <GridToolbar>
          <Item location="after">
            <Btn
              text="Create Organization"
              icon="plus"
              className={`${styles.button_primary}`}
              render={(buttonData) => (
                <>
                  <Image
                    src="/icons/plus.svg"
                    width={24}
                    height={24}
                    alt="Create"
                  />
                  <span>{buttonData.text}</span>
                </>
              )}
              onClick={() => setCreatePopupVisibility(true)}
            />
            <MainPopup
              title="Create Organization"
              visible={createPopupVisible}
              contentRender={RenderCreateOrganization}
              width={400}
              height="100%"
              position={{ my: "top right", at: "top right", of: window }}
              onHiding={() => setCreatePopupVisibility(false)}
              showCloseButton={true}
              wrapperAttr={{ class: "create-popup" }}
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
                    width={24}
                    height={24}
                    alt="Filter"
                  />
                  <span>Filter</span>
                </>
              )}
            />
          </Item>
          <Item name="searchPanel" />
        </GridToolbar>
        <SearchPanel visible={true} highlightCaseSensitive={true} />
      </DataGrid>
      <MainPopup
        // title="Are you sure, you want to delete Fauxbio?"
        wrapperAttr={{ class: "delete-popup" }}
        visible={deletePopup !== -1}
        ref={deleteRef}
        width="577px"
        height="236px"
        showCloseButton={true}
        onHiding={() => showDeletePopup(-1)}
        contentRender={renderContent}
        position={{ my: "center", at: "center", of: window }}
      />
    </>
  );
}
