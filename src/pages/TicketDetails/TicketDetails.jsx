import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import {
  getTicket,
  updateTicketStatus,
  addTicketReply,
} from "../../api/ticketApi";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const [messageApi, contextHolder] =
    message.useMessage();

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTicket(id);

        setTicket(data.ticket || data);
      } catch (error) {
        console.error("Failed to load ticket:", error);

        setError(
          error.message || "Failed to load ticket."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "blue";
      case "In Progress":
        return "orange";
      case "Resolved":
        return "green";
      case "Closed":
        return "default";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "default";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString();
  };

  const handleStatusChange = async (status) => {
    try {
      setStatusLoading(true);

      const data = await updateTicketStatus(
        ticket.id,
        status
      );

      setTicket(
        data.ticket || {
          ...ticket,
          status,
          updated_at: new Date().toISOString(),
        }
      );

      messageApi.success(
        `Ticket status changed to ${status}.`
      );
    } catch (error) {
      console.error(
        "Failed to update ticket status:",
        error
      );

      messageApi.error(
        error.message ||
          "Failed to update ticket status."
      );
    } finally {
      setStatusLoading(false);
    }
  };

  const handleReply = async () => {
    const messageText = replyText.trim();

    if (!messageText) {
      messageApi.warning(
        "Please enter a reply before sending."
      );
      return;
    }

    if (ticket.status === "Closed") {
      messageApi.warning(
        "You cannot reply to a closed ticket."
      );
      return;
    }

    try {
      setReplyLoading(true);

      await addTicketReply(
        ticket.id,
        messageText
      );

      setReplyText("");

      const refreshedTicket = await getTicket(id);

      setTicket(
        refreshedTicket.ticket || refreshedTicket
      );

      messageApi.success(
        "Reply added successfully."
      );
    } catch (error) {
      console.error(
        "Failed to add reply:",
        error
      );

      messageApi.error(
        error.message ||
          "Failed to add reply."
      );
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !ticket) {
    return (
      <DashboardLayout>
        {contextHolder}

        <Alert
          message="Unable to load ticket"
          description={
            error ||
            "The requested ticket does not exist."
          }
          type="error"
          showIcon
        />

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/tickets")}
          style={{ marginTop: 20 }}
        >
          Back to Tickets
        </Button>
      </DashboardLayout>
    );
  }

  const ticketReplies = ticket.replies || [];

  const canChangeStatus =
    currentUser?.role === "agent" ||
    currentUser?.role === "admin";

  const canReply = ticket.status !== "Closed";

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
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%" }}
        >
          <Text type="secondary">
            Ticket #{ticket.id}
          </Text>

          <Title
            level={2}
            style={{ margin: 0 }}
          >
            {ticket.title}
          </Title>

          <Space wrap>
            <Tag
              color={getStatusColor(
                ticket.status
              )}
            >
              {ticket.status}
            </Tag>

            <Tag
              color={getPriorityColor(
                ticket.priority
              )}
            >
              {ticket.priority} Priority
            </Tag>

            <Tag>
              {ticket.category?.name ||
                ticket.category ||
                "Unknown Category"}
            </Tag>

            {canChangeStatus && (
              <Select
                value={ticket.status}
                loading={statusLoading}
                disabled={statusLoading}
                style={{ width: 170 }}
                onChange={handleStatusChange}
                options={[
                  {
                    value: "Open",
                    label: "Open",
                  },
                  {
                    value: "In Progress",
                    label: "In Progress",
                  },
                  {
                    value: "Resolved",
                    label: "Resolved",
                  },
                  {
                    value: "Closed",
                    label: "Closed",
                  },
                ]}
              />
            )}
          </Space>
        </Space>
      </Card>

      <Card
        title="Ticket Information"
        style={{ marginTop: 20 }}
      >
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Text type="secondary">
              Created
            </Text>

            <br />

            <Text strong>
              {formatDate(ticket.created_at)}
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Text type="secondary">
              Last Updated
            </Text>

            <br />

            <Text strong>
              {formatDate(ticket.updated_at)}
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Text type="secondary">
              Customer
            </Text>

            <br />

            <Text strong>
              {ticket.user?.name ||
                ticket.author?.name ||
                "Unknown"}
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Text type="secondary">
              Customer Email
            </Text>

            <br />

            <Text strong>
              {ticket.user?.email || "N/A"}
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Text type="secondary">
              Assigned Agent
            </Text>

            <br />

            <Text strong>
              {ticket.agent?.name ||
                ticket.assigned_agent?.name ||
                "Unassigned"}
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Text type="secondary">
              Category
            </Text>

            <br />

            <Text strong>
              {ticket.category?.name ||
                ticket.category ||
                "N/A"}
            </Text>
          </Col>
        </Row>
      </Card>

      <Card
        title="Description"
        style={{ marginTop: 20 }}
      >
        <Paragraph
          style={{
            whiteSpace: "pre-wrap",
            marginBottom: 0,
          }}
        >
          {ticket.description}
        </Paragraph>
      </Card>

      <Card
        title={`Replies (${ticketReplies.length})`}
        style={{ marginTop: 20 }}
      >
        {ticketReplies.length === 0 ? (
          <Text type="secondary">
            No replies yet.
          </Text>
        ) : (
          ticketReplies.map((reply) => (
            <div key={reply.id}>
              <Space
                direction="vertical"
                size={4}
                style={{ width: "100%" }}
              >
                <Text strong>
                  {reply.user?.name ||
                    reply.author?.name ||
                    "Unknown User"}
                </Text>

                <Text type="secondary">
                  {reply.user?.role ||
                    reply.author?.role ||
                    "User"}{" "}
                  •{" "}
                  {formatDate(
                    reply.created_at
                  )}
                </Text>

                <Paragraph
                  style={{
                    marginTop: 8,
                    marginBottom: 0,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {reply.message}
                </Paragraph>
              </Space>

              <Divider />
            </div>
          ))
        )}
      </Card>

      <Card
        title="Add Reply"
        style={{ marginTop: 20 }}
      >
        {!canReply ? (
          <Alert
            message="This ticket is closed"
            description="Closed tickets cannot receive new replies."
            type="info"
            showIcon
          />
        ) : (
          <>
            <TextArea
              rows={5}
              placeholder="Write your reply..."
              value={replyText}
              onChange={(event) =>
                setReplyText(
                  event.target.value
                )
              }
              showCount
              maxLength={500}
              disabled={replyLoading}
            />

            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={replyLoading}
              onClick={handleReply}
              style={{ marginTop: 12 }}
            >
              Send Reply
            </Button>
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}

export default TicketDetails;