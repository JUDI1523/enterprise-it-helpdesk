import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import DashboardLayout from "../../layouts/DashboardLayout";
import useUserStore from "../../store/userStore";

const { Title } = Typography;

function UserManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] =
    useState(null);

  const [form] = Form.useForm();

  const [messageApi, contextHolder] =
    message.useMessage();

  const users = useUserStore(
    (state) => state.users
  );

  const addUser = useUserStore(
    (state) => state.addUser
  );

  const updateUser = useUserStore(
    (state) => state.updateUser
  );

  const deleteUser = useUserStore(
    (state) => state.deleteUser
  );

  const openAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingUser) {
      updateUser(editingUser.id, values);

      messageApi.success(
        "User updated successfully."
      );
    } else {
      addUser(values);

      messageApi.success(
        "User added successfully."
      );
    }

    setModalOpen(false);
    form.resetFields();
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);

    messageApi.success(
      "User deleted successfully."
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const color =
          role === "admin"
            ? "red"
            : role === "agent"
            ? "blue"
            : "green";

        return (
          <Tag color={color}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              openEditModal(user)
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this user?"
            description="This action cannot be undone."
            onConfirm={() =>
              handleDelete(user.id)
            }
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {contextHolder}

      <Card>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Title
            level={2}
            style={{ margin: 0 }}
          >
            User Management
          </Title>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
          >
            Add User
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: 8,
          }}
          scroll={{ x: 700 }}
        />
      </Card>

      <Modal
        title={
          editingUser
            ? "Edit User"
            : "Add User"
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Please enter the user's name.",
              },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Please enter an email.",
              },
              {
                type: "email",
                message:
                  "Please enter a valid email.",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message:
                  "Please select a role.",
              },
            ]}
          >
            <Select
              placeholder="Select role"
              options={[
                {
                  value: "customer",
                  label: "Customer",
                },
                {
                  value: "agent",
                  label: "Agent",
                },
                {
                  value: "admin",
                  label: "Admin",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              {editingUser
                ? "Save Changes"
                : "Create User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

export default UserManagement;