"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Button from "devextreme-react/button";
import { Popup as Modal } from "devextreme-react/popup";
import styles from "./table.module.css";
import "./table.css";
import {
  Form as CreateForm,
  FormRef,
  SimpleItem,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import { getTimeZones } from "devextreme/time_zone_utils";
import Textbox from "devextreme-react/text-box";
import { createOrganization } from "@/components/Organization/service";

export const RenderCreateOrganization = () => {
  const formRef = useRef<FormRef>(null);

  const handleSubmit = async () => {
    const values = formRef.current!.instance().option("formData");
    const response = await createOrganization(values);
    console.log("response", response);
  };

  const timeZones = getTimeZones(new Date());

  return (
    <CreateForm ref={formRef}>
      <SimpleItem dataField="name">
        <RequiredRule message="Organization name is required" />
      </SimpleItem>
      <SimpleItem dataField="firstName" />
      <SimpleItem dataField="lastName" />
      <SimpleItem dataField="email">
        <RequiredRule message="Email is required" />
        <EmailRule message="Invalid Email Address" />
      </SimpleItem>
      {/* <SimpleItem dataField="Number & Date Time format" /> */}
      <SimpleItem
        dataField="timezone"
        editorType="dxSelectBox"
        editorOptions={{
          dataSource: timeZones,
          placeholder: "Select a time zone",
          searchEnabled: true,
          displayExpr: "title",
          valueExpr: "title",
        }}
      />
      <ButtonItem horizontalAlignment="left" cssClass="btnform">
        <ButtonOptions
          text="Create Customer"
          useSubmitBehavior={true}
          onClick={handleSubmit}
        />
      </ButtonItem>
    </CreateForm>
  );
};

const ToolbarComponent = () => {
  const [createPopupVisible, setCreatePopupVisibility] = useState(false);

  return (
    <div className="flex justify-end mb-3">
      <Button
        text="Create Organization"
        icon="plus"
        className={`${styles.button_primary} mr-2.5`}
        render={(buttonData) => (
          <>
            <Image src="/icons/plus.svg" width={20} height={20} alt="Create" />
            <span className="pl-2">{buttonData.text}</span>
          </>
        )}
        onClick={() => setCreatePopupVisibility(true)}
      />
      <Modal
        title="Create Organization"
        visible={createPopupVisible}
        contentRender={RenderCreateOrganization}
        width={400}
        height="100%"
        position={{ my: "top right", at: "top right", of: window }}
        onHiding={() => setCreatePopupVisibility(false)}
        showCloseButton={true}
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
      <Textbox placeholder="Search" elementAttr={{ class: "search" }}>
        {/* < */}
      </Textbox>
    </div>
  );
};

export default ToolbarComponent;
