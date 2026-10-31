import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Empty,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";

import {
  PlusOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useLanguageStore from "../../store/languageStore";

import { getTickets } from "../../api/ticketApi";

const { Title, Text } = Typography;

function Tickets() {
  const navigate = useNavigate();

  const language = useLanguageStore(
    (state) => state.language
  );

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text = {
    en: {
      title: "All Tickets",
      subtitle: "View and manage all support tickets.",
      createTicket: "Create Ticket",
      search: "Search tickets...",
      allStatuses: "All Statuses",
      allPriorities: "All Priorities",
      id: "ID",
      ticketTitle: "Title",
      category: "Category",
      priority: "Priority",
      status: "Status",
      createdBy: "Created By",
      action: "Action",
      view: "View",
      noTickets: "No tickets available.",
      loading: "Loading...",
      error: "Unable to load tickets.",
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      closed: "Closed",
      high: "High",
      medium: "Medium",
      low: "Low",
    },

    am: {
      title: "ሁሉም ቲኬቶች",
      subtitle: "ሁሉንም የድጋፍ ቲኬቶች ይመልከቱ እና ያስተዳድሩ።",
      createTicket: "ቲኬት ፍጠር",
      search: "ቲኬቶችን ይፈልጉ...",
      allStatuses: "ሁሉም ሁኔታዎች",
      allPriorities: "ሁሉም ቅድሚያዎች",
      id: "መለያ",
      ticketTitle: "ርዕስ",
      category: "ምድብ",
      priority: "ቅድሚያ",
      status: "ሁኔታ",
      createdBy: "የፈጠረው",
      action: "ተግባር",
      view: "ይመልከቱ",
      noTickets: "ምንም ቲኬት የለም።",
      loading: "በመጫን ላይ...",
      error: "ቲኬቶችን መጫን አልተቻለም።",
      open: "ክፍት",
      inProgress: "በሂደት ላይ",
      resolved: "ተፈትቷል",
      closed: "ተዘግቷል",
      high: "ከፍተኛ",
      medium: "መካከለኛ",
      low: "ዝቅተኛ",
    },
  };

  const t = text[language];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTickets();

        setTickets(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Failed to load tickets:",
          error
        );

        setError(
          error.message || t.error
        );
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Open") return "blue";
    if (status === "In Progress") return "orange";
    if (status === "Resolved") return "green";
    if (status === "Closed") return "default";

    return "default";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "orange";
    if (priority === "Low") return "green";

    return "default";
  };

  const getStatusText = (status) => {
    if (status === "Open") return t.open;
    if (status === "In Progress") return t.inProgress;
    if (status === "Resolved") return t.resolved;
    if (status === "Closed") return t.closed;

    return status;
  };

  const getPriorityText = (priority) => {
    if (priority === "High") return t.high;
    if (priority === "Medium") return t.medium;
    if (priority === "Low") return t.low;

    return priority;
  };

  const filteredTickets = tickets.filter(
    (ticket) => {
      const matchesSearch =
        !search ||
        ticket.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter ||
        ticket.status === statusFilter;

      const matchesPriority =
        !priorityFilter ||
        ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  const columns = [
    {
      title: t.id,
      dataIndex: "id",
      key: "id",
      width: 70,
    },

    {
      title: t.ticketTitle,
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },

    {
      title: t.category,
      key: "category",
      render: (_, ticket) =>
        ticket.category?.name ||
        ticket.category ||
        "N/A",
    },

    {
      title: t.priority,
      dataIndex: "priority",
      key: "priority",

      render: (priority) => (
        <Tag
          color={getPriorityColor(priority)}
        >
          {getPriorityText(priority)}
        </Tag>
      ),
    },

    {
      title: t.status,
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag
          color={getStatusColor(status)}
        >
          {getStatusText(status)}
        </Tag>
      ),
    },

    {
      title: t.createdBy,
      key: "createdBy",

      render: (_, ticket) =>
        ticket.user?.name ||
        ticket.author?.name ||
        ticket.created_by ||
        "N/A",
    },

    {
      title: t.action,
      key: "action",

      render: (_, ticket) => (
        <Button
          type="link"
          icon={<ArrowRightOutlined />}
          onClick={() =>
            navigate(`/tickets/${ticket.id}`)
          }
        >
          {t.view}
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Space
        direction="vertical"
        size={4}
      >
        <Title
          level={2}
          style={{ margin: 0 }}
        >
          {t.title}
        </Title>

        <Text type="secondary">
          {t.subtitle}
        </Text>
      </Space>

      <Card
        style={{
          marginTop: 24,
          borderRadius: 12,
        }}
      >
        <Space
          wrap
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Space wrap>
            <Input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={t.search}
              style={{
                width: 250,
              }}
            />

            <Select
              value={statusFilter || undefined}
              onChange={(value) =>
                setStatusFilter(value || "")
              }
              placeholder={t.allStatuses}
              allowClear
              style={{
                width: 170,
              }}
              options={[
                {
                  value: "Open",
                  label: t.open,
                },
                {
                  value: "In Progress",
                  label: t.inProgress,
                },
                {
                  value: "Resolved",
                  label: t.resolved,
                },
                {
                  value: "Closed",
                  label: t.closed,
                },
              ]}
            />

            <Select
              value={
                priorityFilter || undefined
              }
              onChange={(value) =>
                setPriorityFilter(value || "")
              }
              placeholder={t.allPriorities}
              allowClear
              style={{
                width: 170,
              }}
              options={[
                {
                  value: "High",
                  label: t.high,
                },
                {
                  value: "Medium",
                  label: t.medium,
                },
                {
                  value: "Low",
                  label: t.low,
                },
              ]}
            />
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              navigate("/tickets/create")
            }
          >
            {t.createTicket}
          </Button>
        </Space>
      </Card>

      {error && (
        <Alert
          message={t.error}
          description={error}
          type="error"
          showIcon
          style={{
            marginTop: 24,
          }}
        />
      )}

      <Card
        style={{
          marginTop: 24,
          borderRadius: 12,
        }}
      >
        {filteredTickets.length === 0 ? (
          <Empty
            description={t.noTickets}
          />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredTickets}
            pagination={{
              pageSize: 10,
            }}
            scroll={{
              x: 900,
            }}
          />
        )}
      </Card>
    </DashboardLayout>
  );
}

export default Tickets;

