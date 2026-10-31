import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Typography,
  message,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getCategories,
  createCategory,
} from "../../api/categoryApi";

const { Title } = Typography;

function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [messageApi, contextHolder] =
    message.useMessage();

  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(
        "Failed to load categories:",
        error
      );

      setError(
        error.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    form.resetFields();
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      setError("");

      await createCategory({
        name: values.name,
        description: values.description,
      });

      messageApi.success(
        "Category created successfully."
      );

      setModalOpen(false);
      form.resetFields();

      await loadCategories();
    } catch (error) {
      console.error(
        "Failed to create category:",
        error
      );

      setError(
        error.message ||
          "Failed to create category."
      );

      messageApi.error(
        error.message ||
          "Failed to create category."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },

    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            Category Management
          </Title>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
          >
            Add Category
          </Button>
        </Space>

        {error && (
          <Alert
            message="Category operation failed"
            description={error}
            type="error"
            showIcon
            style={{
              marginBottom: 20,
            }}
          />
        )}

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 60,
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={categories}
            pagination={{
              pageSize: 8,
            }}
            scroll={{ x: 700 }}
          />
        )}
      </Card>

      <Modal
        title="Add Category"
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
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Please enter a category name.",
              },
            ]}
          >
            <Input
              placeholder="Example: Hardware"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Please enter a description.",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe this category..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
            >
              Create Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

export default CategoryManagement;

