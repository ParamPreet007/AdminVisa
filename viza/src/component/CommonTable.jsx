import { Table } from "antd";
const CommonTable = ({
  columns,
  data,
  loading,
  searchParams,
  totalRecords,
  setSearchParams,
  rowClassName,
}) => {
  return (
    <Table
      bordered
      rowClassName={rowClassName}
      className="paginationInput"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        pageSize: searchParams?.limit || 25,
        total: totalRecords,
        current: searchParams?.page || 1,
        pageSizeOptions: [25, 50, 100, 200],
        showSizeChanger: totalRecords > 25 && true,
        position: ["bottomCenter"],
      }}
      onChange={({ current, pageSize }, f, { field, order }) => {
        const updatedParams = {
          page: current,
          limit: pageSize,
        };

        if (field) {
          updatedParams.sortBy = field;
          updatedParams.order = { ascend: 1, descend: -1 }[order];
        }
        setSearchParams(updatedParams);
      }}
      sticky
      scroll={{ x: "max-content" }}
    />
  );
};

export default CommonTable;
