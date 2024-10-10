import { HeaderWeb } from "../../HeaderWeb";
import "./classList.scss";

export const ClassList = () => {
  return (
    <div className="class-list">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={true} />
      <div className="class-list_content">
        <h1>Danh sách lớp học</h1>
      </div>
    </div>
  );
};
