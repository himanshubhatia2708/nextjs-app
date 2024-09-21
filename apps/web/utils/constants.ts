export const status = ["Enabled", "Disabled"];

export const tableFields = {
  columns: [
    "organizationName",
    "projects",
    "molecules",
    "users",
    "organizationStatus",
    "organizationAdmin",
    "creationDate",
    "lastModifiedDate",
  ],
  editable: true,
  editingMode: "popup",
  editFields: [
    {
      dataField: "organizationName",
      required: "Organization name is required",
    },
    { type: "radio", dataField: "organizationStatus", items: status },
    { dataField: "numberAndDateTimeFormat" },
    { type: "dxSelectBox", dataField: "timeZone" },
    { dataField: "primaryContact" },
  ],
  toolbar: true,
  searchPanel: true,
  createFields: [
    { dataField: "organizationName" },
    { dataField: "organizationAdminFirstName" },
    { dataField: "organizationAdminLastName" },
    { dataField: "organizationAdminEmailAddress" },
    { dataField: "numberAndDateTimeFormat" },
    { dataField: "timeZone" },
    { dataField: "primaryContact" },
  ],
};
