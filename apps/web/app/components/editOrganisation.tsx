import { Item, Form } from "devextreme-react/data-grid";
import RadioGroup from "devextreme-react/radio-group";

const EditOrganization = ({ tableFields }) => {
  console.log("sd");
  return (
    <Form>
      {tableFields.editFields.map(({ type, dataField, items }) => (
        <Item dataField={dataField} key={dataField}>
          {type === "radio" && <RadioGroup items={items} />}
        </Item>
      ))}
    </Form>
  );
};

export default EditOrganization;
