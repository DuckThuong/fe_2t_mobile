import TableWrap from "../../Components/TableWrap";
import { HeaderWeb } from "../HeaderWeb";

const conlumns = [{}];
const data = [{}];
export const ListStudents = () => {
  return (
    <div className="list-shipment">
      {/* <HeaderWeb name="REPO_WEB" /> */}
      <div className="list-shipments_header">
        <h1 className="list-shipments_header-title">Danh sách sinh viên</h1>
      </div>
      <div className="list-shipment_table">
        <TableWrap
          setSize={() => {}}
          scrollValue={{ x: 1200 }}
          isHidePagination
          rootClassName="list-shipment_table-wrap"
          tableProps={{
            columns: conlumns,
            dataSource: data,
            rowHoverable: false,
          }}
        />
      </div>
    </div>
  );
};
