import { useEffect, useRef, useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import TableWrap from "../../../Components/TableWrap";
import { TableRowSelection } from "antd/es/table/interface";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSort } from "@fortawesome/free-solid-svg-icons";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import StudentFooterActions from "../../FooterWeb";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./reward.scss";
import { Modal } from "antd";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { useForm } from "antd/es/form/Form";
import NotificationPopup from "../../Notification";
enum RewardChoosen {
  FIRST_PLACE = "Giải Nhất",
  SECOND_PLACE = "Giải Nhì",
  THIRD_PLACE = "Giải Ba",
  HONORABLE_MENTION = "Giải Khuyến Khích",
  CREATIVITY = "Giải Sáng Tạo",
  CONTRIBUTION = "Giải Cống Hiến",
  SPECIAL = "Giải Đặc Biệt",
  STUDY_ENCOURAGEMENT = "Giải Khuyến Học",
  SPIRIT = "Giải Tinh Thần",
  UNITY = "Giải Đoàn Kết",
}
enum classSelector {
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
}
enum classCodeSelector {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
enum AwardReason {
  EXCELLENT_ACADEMIC_PERFORMANCE = "Thành tích học tập xuất sắc",
  SPORTS_ACHIEVEMENT = "Thành tích thể thao",
  ARTISTIC_ACHIEVEMENT = "Thành tích văn nghệ",
  SCIENTIFIC_RESEARCH = "Thành tích nghiên cứu khoa học",
  CREATIVITY = "Thành tích sáng tạo",
  CONTRIBUTION = "Thành tích cống hiến",
  SPECIAL_ACHIEVEMENT = "Thành tích đặc biệt",
  ACADEMIC_IMPROVEMENT = "Thành tích học tập tiến bộ",
  GOOD_SPIRIT = "Tinh thần học tập tốt",
  UNITY_SPIRIT = "Tinh thần đoàn kết",
}
enum AwardValueSortOrder {
  ASCENDING = "Tăng dần",
  DESCENDING = "Giảm dần",
}
export const Reward = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const navigate = useNavigate();
  const [form] = useForm();
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
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const rewardOptions = Object.values(RewardChoosen).map((major) => ({
    label: major,
    value: major,
  }));
  const classOption = Object.values(classSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const classCodeOption = Object.values(classCodeSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const AwardReasonOption = Object.values(AwardReason).map((reason) => ({
    label: reason,
    value: reason,
  }));
  const awardValueSortOptions = [
    {
      label: AwardValueSortOrder.ASCENDING,
      value: AwardValueSortOrder.ASCENDING,
    },
    {
      label: AwardValueSortOrder.DESCENDING,
      value: AwardValueSortOrder.DESCENDING,
    },
  ];
  // Define a sorting function
  const sortAwardValue = (a, b, order) => {
    if (order === AwardValueSortOrder.ASCENDING) {
      return a.giatrigiaithuong - b.giatrigiaithuong;
    } else if (order === AwardValueSortOrder.DESCENDING) {
      return b.giatrigiaithuong - a.giatrigiaithuong;
    }
    return 0;
  };
  const conlumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record) => {
        return <p style={{ color: "black", fontWeight: "600" }}>{record.id}</p>;
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
      render: (text, record, _index) => {
        return (
          <p className="list-tuition_table-data">{record.tengiaithuong}</p>
        );
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: rewardOptions,
      onFilter: (value, record) => record.tengiaithuong.includes(value),
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
      id: "lop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.lop}</p>;
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: classOption,
      onFilter: (value, record) => record.lop.includes(value), // Updated to use 'lop'
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      id: "malop",
      render: (_text, record, index) => {
        return <p className="list-tuition_table-data">{record.malop}</p>;
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: classCodeOption,
      onFilter: (value, record) => record.malop.includes(value),
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
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: AwardReasonOption,
      onFilter: (value, record) => record.lydo.includes(value),
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
                disabled: !editState,
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
  const [data, setNewData] = useState<any[]>([
    {
      id: "1",
      magiaithuong: "GT001",
      tengiaithuong: "Giải Nhất",
      hocsinhdatgiai: "Nguyễn Văn A",
      mahocsinh: "HS001",
      lop: "6",
      malop: "A",
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
      lop: "7",
      malop: "B",
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
      lop: "8",
      malop: "C",
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
      lop: "9",
      malop: "D",
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
      lop: "6",
      malop: "A",
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
      lop: "7",
      malop: "B",
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
      lop: "8",
      malop: "C",
      giatrigiaithuong: "2000000",
      thoigian: "2023-10-07",
      lydo: "Thành tích đặc biệt",
    },
    {
      id: "8",
      magiaithuong: "GT008",
      tengiaithuong: "Giải Khuyến Học",
      hocsinhdatgiai: "Lý Thị H",
      mahocsinh: "HS008",
      lop: "9",
      malop: "D",
      giatrigiaithuong: "100000",
      thoigian: "2023-10-08",
      lydo: "Thành tích học tập tiến bộ",
    },
    {
      id: "9",
      magiaithuong: "GT009",
      tengiaithuong: "Giải Tinh Thần",
      hocsinhdatgiai: "Trương Văn I",
      mahocsinh: "HS009",
      lop: "6",
      malop: "A",
      giatrigiaithuong: "750000",
      thoigian: "2023-10-09",
      lydo: "Tinh thần học tập tốt",
    },
    {
      id: "10",
      magiaithuong: "GT010",
      tengiaithuong: "Giải Đoàn Kết",
      hocsinhdatgiai: "Phan Thị J",
      mahocsinh: "HS010",
      lop: "7",
      malop: "B",
      giatrigiaithuong: "500000",
      thoigian: "2023-10-10",
      lydo: "Tinh thần đoàn kết",
    },
  ]);
  useEffect(() => {
    const handleTableScroll = () => {
      if (tableWrapperRef.current && scrollRef.current) {
        scrollRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
      }
    };

    const handleDivScroll = () => {
      if (tableWrapperRef.current && scrollRef.current) {
        tableWrapperRef.current.scrollLeft = scrollRef.current.scrollLeft;
      }
    };

    if (tableWrapperRef.current && scrollRef.current) {
      tableWrapperRef.current.addEventListener("scroll", handleTableScroll);
      scrollRef.current.addEventListener("scroll", handleDivScroll);
    }
    return () => {
      if (tableWrapperRef.current && scrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        tableWrapperRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current.removeEventListener("scroll", handleDivScroll);
      }
    };
  }, []);
  useEffect(() => {
    if (selectedRecord) {
      const fields = conlumns.reduce((acc, column) => {
        if (column.dataIndex) {
          acc[column.dataIndex] = selectedRecord[column.dataIndex];
        }
        return acc;
      }, {});
      form.setFieldsValue(fields);
    }
  }, [selectedRecord, form, conlumns]);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="reward">
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
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
                filters: column.filters?.map((filter) => ({
                  ...filter,
                  text: filter.label,
                })),
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
        <div className="reward_modal">
          {/* Modal Add Student */}
          <Modal
            className="list-student_modal-addStudent"
            open={modalStates.addModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                addModal: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("magiaithuong") &&
                form.getFieldValue("tengiaithuong") &&
                form.getFieldValue("hocsinhdatgiai") &&
                form.getFieldValue("mahocsinh") &&
                form.getFieldValue("lop") &&
                form.getFieldValue("malop") &&
                form.getFieldValue("giatrigiaithuong") &&
                form.getFieldValue("thoigian") &&
                form.getFieldValue("lydo")
              ) {
                const newData = {
                  id: data.length + 1,
                  magiaithuong: form.getFieldValue("magiaithuong"),
                  tengiaithuong: form.getFieldValue("tengiaithuong"),
                  hocsinhdatgiai: form.getFieldValue("hocsinhdatgiai"),
                  mahocsinh: form.getFieldValue("mahocsinh"),
                  lop: form.getFieldValue("lop"),
                  malop: form.getFieldValue("malop"),
                  giatrigiaithuong: form.getFieldValue("giatrigiaithuong"),
                  thoigian: form.getFieldValue("thoigian"),
                  lydo: form.getFieldValue("lydo"),
                };
                setNewData([...data, newData]);
                setModalStates({
                  ...modalStates,
                  addModal: false,
                });
              } else {
                setNotification({
                  message: "Vui lòng điền đầy đủ dữ liệu",
                  type: "error",
                });
              }
            }}
            afterClose={() => {
              form.resetFields();
            }}
          >
            <h1 className="list-student_modal-header">THÊM GIẢI THƯỞNG</h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ GIẢI THƯỞNG</p>
                    <FormInput
                      name={"magiaithuong"}
                      formItemProps={{
                        className: "list-student_form-magiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Mã giải thưởng",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TÊN GIẢI THƯỞNG</p>
                    <FormInput
                      name={"tengiaithuong"}
                      formItemProps={{
                        className: "list-student_form-tengiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Tên giải thưởng",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">HỌC SINH ĐẠT GIẢI</p>
                    <FormInput
                      name={"hocsinhdatgiai"}
                      formItemProps={{
                        className: "list-student_form-hocsinhdatgiai",
                      }}
                      inputProps={{
                        placeholder: "Học sinh đạt giải",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"mahocsinh"}
                      formItemProps={{
                        className: "list-student_form-mahocsinh",
                      }}
                      inputProps={{
                        placeholder: "Mã học sinh",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">LỚP</p>
                    <FormInput
                      name={"lop"}
                      formItemProps={{
                        className: "list-student_form-lop",
                      }}
                      inputProps={{
                        placeholder: "Lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"malop"}
                      formItemProps={{
                        className: "list-student_form-malop",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">
                      GIÁ TRỊ GIẢI THƯỞNG
                    </p>
                    <FormInput
                      name={"giatrigiaithuong"}
                      formItemProps={{
                        className: "list-student_form-giatrigiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Giá trị giải thưởng",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">
                      THỜI GIAN TRAO GIẢI
                    </p>
                    <FormInput
                      name={"thoigian"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian trao giải",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 24 }}>
                    <p className="list-student_row-label">LÝ DO TRAO GIẢI</p>
                    <FormInput
                      name={"lydo"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian trao giải",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>
              <div className="list-student_underLine" />
            </div>
          </Modal>
          {/* Modal Edit student */}
          <Modal
            className="list-student_modal-editStudent"
            open={modalStates.editModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                editModal: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("magiaithuong") &&
                form.getFieldValue("tengiaithuong") &&
                form.getFieldValue("hocsinhdatgiai") &&
                form.getFieldValue("mahocsinh") &&
                form.getFieldValue("lop") &&
                form.getFieldValue("malop") &&
                form.getFieldValue("giatrigiaithuong") &&
                form.getFieldValue("thoigian") &&
                form.getFieldValue("lydo")
              ) {
                const newCourse = {
                  ...selectedRecord,
                  magiaithuong: form.getFieldValue("magiaithuong"),
                  tengiaithuong: form.getFieldValue("tengiaithuong"),
                  hocsinhdatgiai: form.getFieldValue("hocsinhdatgiai"),
                  mahocsinh: form.getFieldValue("mahocsinh"),
                  lop: form.getFieldValue("lop"),
                  malop: form.getFieldValue("malop"),
                  giatrigiaithuong: form.getFieldValue("giatrigiaithuong"),
                  thoigian: form.getFieldValue("thoigian"),
                  lydo: form.getFieldValue("lydo"),
                };

                setNewData(
                  data.map((course) =>
                    course.id === selectedRecord.id ? newCourse : course
                  )
                );
                setModalStates({
                  ...modalStates,
                  editModal: false,
                });
              } else {
                setNotification({
                  message: "Vui lòng điền đầy đủ dữ liệu",
                  type: "error",
                });
              }
            }}
            afterClose={() => {
              form.resetFields();
            }}
          >
            <h1 className="list-student_modal-header">
              SỬA THÔNG TIN GIẢI THƯỞNG
            </h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ GIẢI THƯỞNG</p>
                    <FormInput
                      name={"magiaithuong"}
                      formItemProps={{
                        className: "list-student_form-magiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Mã giải thưởng",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TÊN GIẢI THƯỞNG</p>
                    <FormInput
                      name={"tengiaithuong"}
                      formItemProps={{
                        className: "list-student_form-tengiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Tên giải thưởng",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 2 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">HỌC SINH ĐẠT GIẢI</p>
                    <FormInput
                      name={"hocsinhdatgiai"}
                      formItemProps={{
                        className: "list-student_form-hocsinhdatgiai",
                      }}
                      inputProps={{
                        placeholder: "Học sinh đạt giải",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"mahocsinh"}
                      formItemProps={{
                        className: "list-student_form-mahocsinh",
                      }}
                      inputProps={{
                        placeholder: "Mã học sinh",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 3 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">LỚP</p>
                    <FormInput
                      name={"lop"}
                      formItemProps={{
                        className: "list-student_form-lop",
                      }}
                      inputProps={{
                        placeholder: "Lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"malop"}
                      formItemProps={{
                        className: "list-student_form-malop",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 4 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">
                      GIÁ TRỊ GIẢI THƯỞNG
                    </p>
                    <FormInput
                      name={"giatrigiaithuong"}
                      formItemProps={{
                        className: "list-student_form-giatrigiaithuong",
                      }}
                      inputProps={{
                        placeholder: "Giá trị giải thưởng",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">
                      THỜI GIAN TRAO GIẢI
                    </p>
                    <FormInput
                      name={"thoigian"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian trao giải",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 5 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 24 }}>
                    <p className="list-student_row-label">LÝ DO TRAO GIẢI</p>
                    <FormInput
                      name={"lydo"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian trao giải",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>
              <div className="list-student_underLine" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
