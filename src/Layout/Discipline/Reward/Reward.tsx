import { useRef, useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import TableWrap from "../../../Components/TableWrap";
import { TableRowSelection } from "antd/es/table/interface";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import StudentFooterActions from "../../FooterWeb";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./reward.scss";
export const Reward = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const navigate = useNavigate();
  const [editState, setEditState] = useState<boolean>(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalStates, setModalStates] = useState({
    editModal: false,
    deleteModal: false,
    addModal: false,
    addStudent: false,
    showDeleteButton: false,
    showEditButton: false,
    showNewColumn: false,
    showRegistedNewColumn: false,
    showEditstudent: false,
  });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleExportExcel = () => {
    const selectedData = data.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const headers = [
      { header: "STT", key: "id" },
      { header: "MÃ GIẢI THƯỞNG", key: "magiaithuong" },
      { header: "TÊN GIẢI THƯỞNG", key: "tengiaithuong" },
      { header: "HỌC SINH ĐẠT GIẢI", key: "hocsinhdatgiai" },
      { header: "MÃ HỌC SINH", key: "mahocsinh" },
      { header: "LỚP", key: "lop" },
      { header: "MÃ LỚP", key: "malop" },
      { header: "GIÁ TRỊ GIẢI THƯỞNG", key: "giatrigiaithuong" },
      { header: "THỜI GIAN TRAO GIẢI", key: "thoigian" },
      { header: "LÝ DO TRAO GIẢI", key: "lydo" },
    ];
    const worksheet = XLSX.utils.json_to_sheet(selectedData, {
      header: headers.map((h) => h.key),
    });
    const workbook = XLSX.utils.book_new();
    headers.forEach((h, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      worksheet[cellAddress].v = h.header;
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsList");
    XLSX.writeFile(workbook, "DanhSachSinhVien.xlsx");
  };

  const conlumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return (
          <p style={{ color: "black", fontWeight: "600" }}>{record.key}</p>
        );
      },
    },
    {
      title: "MÃ GIẢI THƯỞNG",
      dataIndex: "magiaithuong",
      key: "magiaithuong",
      render: (record) => {
        return (
          <>
            <p className="reward_data-magiaithuong">{record}</p>
          </>
        );
      },
    },
    {
      title: "TÊN GIẢI THƯỞNG",
      dataIndex: "tengiaithuong",
      key: "tengiaithuong",
      render: (record) => {
        return (
          <>
            <p className="reward_data-tengiaithuong">{record}</p>
          </>
        );
      },
    },
    {
      title: "HỌC SINH ĐẠT GIẢI",
      dataIndex: "hocsinhdatgiai",
      key: "hocsinhdatgiai",
      render: (record) => {
        return (
          <>
            <p className="reward_data-hocsinhdatgiai">{record}</p>
          </>
        );
      },
    },
    {
      title: "MÃ HỌC SINH",
      dataIndex: "mahocsinh",
      key: "mahocsinh",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "LỚP",
      dataIndex: "lop",
      key: "lop",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      key: "malop",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "GIÁ TRỊ GIẢI THƯỞNG",
      dataIndex: "giatrigiaithuong",
      key: "giatrigiaithuong",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "THỜI GIAN TRAO GIẢI",
      dataIndex: "thoigian",
      key: "thoigian",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "LÝ DO TRAO GIẢI",
      dataIndex: "lydo",
      key: "lydo",
      render: (record) => {
        return (
          <>
            <p className="reward_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "CHÚ THÍCH",
      dataIndex: "lydo",
      key: "lydo",
      render: (record) => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.REWARD_INFORMATION);
                },
              }}
            />
          </>
        );
      },
    },
    {
      title: "CHỨC NĂNG",
      dataIndex: "cn",
      key: "cn",
      render: (text, record) => {
        return (
          <>
            {modalStates.showEditButton && (
              <CustomButton
                content="Sửa"
                buttonProps={{
                  onClick: () => {
                    setSelectedRecord(record);
                    setModalStates({
                      ...modalStates,
                      editModal: true,
                    });
                  },
                  icon: <EditOutlined />,
                  className: "list-student_footer-editTable",
                }}
              />
            )}
            {modalStates.showDeleteButton && (
              <CustomButton
                content="Xóa"
                buttonProps={{
                  icon: <DeleteOutlined />,
                  onClick: () => {
                    setModalStates({
                      ...modalStates,
                      deleteModal: true,
                    });
                  },
                  className: "list-student_footer-delete",
                }}
              />
            )}
          </>
        );
      },

      hidden: !modalStates.showRegistedNewColumn,
    },
  ];
  const data = [
    {
      id: "1",
      magiaithuong: "GT001",
      tengiaithuong: "Giải Nhất",
      hocsinhdatgiai: "Nguyễn Văn A",
      mahocsinh: "HS001",
      lop: "10A1",
      malop: "L001",
      giatrigiaithuong: "1000000",
      thoigian: "2023-10-01",
      lydo: "Thành tích học tập xuất sắc",
    },
    {
      id: "2",
      magiaithuong: "GT002",
      tengiaithuong: "Giải Nhì",
      hocsinhdatgiai: "Trần Thị B",
      mahocsinh: "HS002",
      lop: "10A2",
      malop: "L002",
      giatrigiaithuong: "500000",
      thoigian: "2023-10-02",
      lydo: "Thành tích thể thao",
    },
    {
      id: "3",
      magiaithuong: "GT003",
      tengiaithuong: "Giải Ba",
      hocsinhdatgiai: "Lê Văn C",
      mahocsinh: "HS003",
      lop: "10A3",
      malop: "L003",
      giatrigiaithuong: "300000",
      thoigian: "2023-10-03",
      lydo: "Thành tích văn nghệ",
    },
    {
      id: "4",
      magiaithuong: "GT004",
      tengiaithuong: "Giải Khuyến Khích",
      hocsinhdatgiai: "Phạm Thị D",
      mahocsinh: "HS004",
      lop: "10A4",
      malop: "L004",
      giatrigiaithuong: "200000",
      thoigian: "2023-10-04",
      lydo: "Thành tích nghiên cứu khoa học",
    },
    {
      id: "5",
      magiaithuong: "GT005",
      tengiaithuong: "Giải Sáng Tạo",
      hocsinhdatgiai: "Ngô Văn E",
      mahocsinh: "HS005",
      lop: "10A5",
      malop: "L005",
      giatrigiaithuong: "150000",
      thoigian: "2023-10-05",
      lydo: "Thành tích sáng tạo",
    },
    {
      id: "6",
      magiaithuong: "GT006",
      tengiaithuong: "Giải Cống Hiến",
      hocsinhdatgiai: "Đỗ Thị F",
      mahocsinh: "HS006",
      lop: "10A6",
      malop: "L006",
      giatrigiaithuong: "250000",
      thoigian: "2023-10-06",
      lydo: "Thành tích cống hiến",
    },
    {
      id: "7",
      magiaithuong: "GT007",
      tengiaithuong: "Giải Đặc Biệt",
      hocsinhdatgiai: "Vũ Văn G",
      mahocsinh: "HS007",
      lop: "10A7",
      malop: "L007",
      giatrigiaithuong: "2000000",
      thoigian: "2023-10-07",
      lydo: "Thành tích đặc biệt",
    },
  ];

  return (
    <div className="reward">
      <div className="reward_content">
        <div className="reward_sidebar" ref={scrollRef}>
          <h1 className="reward_content-header">
            Danh sách học sinh được khen thưởng
          </h1>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[16, 16]}
            className="reward_sidebar-scroll"
          >
            <FormWrap
              className="reward_sidebar-colRight-formSearch"
              name="search-product"
              layout={"inline"}
              initialValues={{
                select: "Dữ liệu",
              }}
              onFinish={() => {}}
            >
              <FormInputSearch
                name={"fullrecordSearch"}
                isShowIcon={false}
                formItemProps={{
                  className: "reward_sidebar-colRight-formSearch-input",
                }}
                inputProps={{
                  placeholder: "Mã học sinh",
                }}
              />
              <FormButtonSubmit
                content={<SvgMagnifyingGlassSubmit />}
                formItemProps={{
                  className: "reward_sidebar-colRight-formSearch-button",
                }}
              />
            </FormWrap>
          </RowWrap>
        </div>
        <div className="reward_table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-student_table-wrap"
            tableWrapperRef={tableWrapperRef}
            tableProps={{
              columns: conlumns.map((column) => ({
                ...column,
                // filters: column.filters?.map((filter) => ({
                //   ...filter,
                //   text: filter.label,
                // })),
              })),
              dataSource: data,
              rowSelection: rowSelection,
            }}
          />
        </div>
        <div className="reward_footer">
          <StudentFooterActions
            editState={editState}
            setEditState={setEditState}
            modalStates={modalStates}
            setModalStates={setModalStates}
            handleExportExcel={handleExportExcel}
            disAble={!hasSelected}
            shouldScroll={false}
            isPrint={true}
            isShowOption={true}
            isExport={true}
            add={true}
          />
        </div>
      </div>
    </div>
  );
};
