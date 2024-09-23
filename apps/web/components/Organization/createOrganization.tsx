"use client";
import { useRef } from "react";
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
import { createOrganization } from "./service";

export default function RenderCreateOrganization() {
  const formRef = useRef<FormRef>(null);

  const handleSubmit = async () => {
    const values = formRef.current!.instance().option("formData");
    const response = await createOrganization(values);
    console.log(response);
  };

  const timeZones = getTimeZones(new Date());

  return (
    <CreateForm ref={formRef}>
      <SimpleItem
        dataField="name"
        editorOptions={{ placeholder: "Enter New Organization Name" }}
      >
        <RequiredRule message="Organization name is required" />
      </SimpleItem>
      <SimpleItem
        dataField="firstName"
        editorOptions={{ placeholder: "FirstName" }}
      />
      <SimpleItem
        dataField="lastName"
        editorOptions={{ placeholder: "LastName" }}
      />
      <SimpleItem
        dataField="email"
        editorOptions={{ placeholder: "Enter Admin Email Address" }}
      >
        <RequiredRule message="Email is required" />
        <EmailRule message="Invalid Email Address" />
      </SimpleItem>
      {/* <SimpleItem dataField="Number & Date Time format" editorOptions={{ placeholder: "Enter New Organization Name" }} /> */}
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
}
