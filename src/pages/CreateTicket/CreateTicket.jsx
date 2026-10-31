import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getCategories } from "../../api/categoryApi";
import { createTicket } from "../../api/ticketApi";

const { Title, Text } = Typography;
const { TextArea } = Input;

function CreateTicket() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
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
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      setError("");

      await createTicket({
        title: values.title,
        description: values.description,
        category_id: values.category_id,
        priority: values.priority,
      });

      messageApi.success(
        "Ticket created successfully."
      );

      form.resetFields();

      navigate("/tickets");
    } catch (error) {
      console.error(
        "Failed to create ticket:",
        error
      );

      setError(
        error.message ||
          "Failed to create ticket."
      );

      messageApi.error(
        error.message ||
          "Failed to create ticket."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {contextHolder}

      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/tickets")}
        style={{ marginBottom: 20 }}
      >
        Back to Tickets
      </Button>

      <Card>
        <Title level={2}>
          Create Ticket
        </Title>

        <Text type="secondary">
          Submit a new IT support request.
        </Text>

        {error && (
          <Alert
            message="Unable to create ticket"
            description={error}
            type="error"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message:
                  "Please enter a ticket title.",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Example: My computer is not connecting to Wi-Fi"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[
              {
                required: true,
                message:
                  "Please select a category.",
              },
            ]}
          >
            {loadingCategories ? (
              <Spin />
            ) : (
              <Select
                size="large"
                placeholder="Select a category"
                options={categories.map(
                  (category) => ({
                    value: category.id,
                    label: category.name,
                  })
                )}
              />
            )}
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
                message:
                  "Please select a priority.",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select priority"
              options={[
                {
                  value: "Low",
                  label: "Low",
                },
                {
                  value: "Medium",
                  label: "Medium",
                },
                {
                  value: "High",
                  label: "High",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Please describe your issue.",
              },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Describe the problem in detail..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              size="large"
            >
              Create Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </DashboardLayout>
  );
}

export default CreateTicket;

