"use client";
import Image from "next/image";
import DataGrid, {
  Toolbar,
  Item,
  DataGridRef,
  SearchPanel,
  Column,
  Editing,
  Button as Btn,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import styles from "./table.module.css";
import { data } from "../../data/organization";

const columns = [
  "organizationName",
  "projects",
  "molecules",
  "users",
  "organizationStatus",
  "organizationAdmin",
  "creationDate",
  "lastModifiedDate",
];

const btnClasses = `mr-2.5 ${styles.button_primary}`;

const Table = () => {
  return (
    <DataGrid
      dataSource={data}
      allowColumnReordering={true}
      defaultColumns={columns}
      showBorders={true}
      showColumnLines={true}
    >
      <Column dataField="Product" caption="Name" dataType="string" />
      <Editing
        mode="row"
        useIcons={true}
        allowUpdating={true}
        // allowDeleting={isDeleteIconVisible}
      />
      <Column type="buttons">
        <Btn icon="edit" />
      </Column>
      <Toolbar>
        <Item location="after">
          <Button
            text="Create Organization"
            icon="plus"
            className={btnClasses}
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
          />
        </Item>
        <Item location="after">
          <Button
            text="Filter"
            icon="filter"
            className={styles.button_primary}
            render={(buttonData) => (
              <>
                <Image
                  src="/icons/filter.svg"
                  width={20}
                  height={20}
                  alt="Picture of the author"
                />
                <span className="pl-2">Filter</span>
              </>
              // <i style={{ color: '#0f69af' }}>{buttonData.text}</i>
            )}
          />
        </Item>
        <Item name="searchPanel" />
      </Toolbar>
      <SearchPanel visible={true} highlightCaseSensitive={true} />
    </DataGrid>
  );
};

export default Table;
