import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Highlighter } from "antd";

const { Search } = Input;
const { Option } = Select;

const MembersTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
    setData(data);
    setFilteredData(data);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text.toString()}
        // />
        // <Highlighter
        //   searchWords={["world"]}
        //   textToHighlight="Hello world"
        //   highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        // />
        <></>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (text, record) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(record.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, record.id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== record.id));
            }
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Developer", value: "Developer" },
        { text: "Manager", value: "Manager" },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditingId(record.id);
            }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => {
              setData(data.filter((item) => item.id !== record.id));
              setSelectedRows(selectedRows.filter((id) => id !== record.id));
              message.success("Member deleted successfully");
            }}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowSelection={rowSelection}
        onChange={handleChange}
        pagination={{
          current: page,
          pageSize,
          total: data.length,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </>
  );
};

export default MembersTable;
