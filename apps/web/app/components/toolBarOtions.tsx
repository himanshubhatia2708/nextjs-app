"use client";
import { useState } from "react";
import Image from "next/image";
// import { Toolbar, Item } from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { Popup as Modal } from "devextreme-react/popup";
import styles from "./table.module.css";
import {
  Form as CreateForm,
  SimpleItem,
  ButtonItem,
  ButtonOptions,
} from "devextreme-react/form";

interface TableProps {
  createFields: createFieldType;
}

interface createFieldType {
  dataField: string;
  type?: string;
  items?: string[];
}

const ToolbarComponent: React.FC<TableProps> = ({ createFields }) => {
  const [createPopupVisible, setCreatePopupVisibility] = useState(false);

  const renderContent = () => {
    return (
      <CreateForm>
        {createFields.map(({ dataField }) => (
          <SimpleItem key={dataField} dataField={dataField}></SimpleItem>
        ))}
        {/* <SimpleItem
          dataField="timeZone"
          editorType="dxSelectBox" // Using SelectBox as an editor
          editorOptions={{
            dataSource: timeZones,
            placeholder: "Select a time zone",
            searchEnabled: true, // Enable searching in the dropdown
            displayExpr: (item) => item, // Display the timezone string
            valueExpr: (item) => item, // Use the timezone string as the value
          }}
        /> */}
        <ButtonItem>
          <ButtonOptions text="Create Customer" useSubmitBehavior={true} />
        </ButtonItem>
      </CreateForm>
    );
  };

  return (
    <div className="flex justify-end mb-3">
      <Button
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
      <Modal
        title="Create Organization"
        visible={createPopupVisible}
        contentRender={renderContent}
        width={400}
        height="100%"
        position={{ my: "top right", at: "top right", of: window }}
        onHiding={() => setCreatePopupVisibility(false)}
      />

      <Button
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
    </div>
  );
};

export default ToolbarComponent;
