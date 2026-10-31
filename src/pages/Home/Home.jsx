import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../../store/themeStore";

const { Title, Text, Paragraph } = Typography;

function Home() {
  const navigate = useNavigate();

  const mode = useThemeStore(
    (state) => state.mode
  );

  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const isAmharic = language === "am";

  const changeLanguage = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  const t = {
    home: isAmharic ? "መነሻ" : "Home",
    features: isAmharic ? "ባህሪያት" : "Features",
    about: isAmharic ? "ስለ እኛ" : "About Us",
    contact: isAmharic ? "ያግኙን" : "Contact Us",
    login: isAmharic ? "ግባ" : "Login",

    platform: isAmharic
      ? "የድርጅት የአይቲ ድጋፍ መድረክ"
      : "ENTERPRISE IT SUPPORT PLATFORM",

    support: isAmharic
      ? "የአይቲ ድጋፍ።"
      : "IT Support.",

    simple: isAmharic
      ? "ቀላል አድርገነዋል።"
      : "Made Simple.",

    heroDescription: isAmharic
      ? "የድጋፍ ጥያቄዎችን ለማስተዳደር፣ ቲኬቶችን ለመከታተል፣ ከድጋፍ ቡድኖች ጋር ለመገናኘት እና የቴክኒክ ችግሮችን በፍጥነት ለመፍታት የተዘጋጀ ዘመናዊ የአይቲ ድጋፍ መድረክ።"
      : "A modern helpdesk platform for managing support requests, tracking tickets, communicating with support teams, and resolving technical issues faster.",

    getStarted: isAmharic
      ? "ጀምር"
      : "Get Started",

    exploreFeatures: isAmharic
      ? "ባህሪያትን ይመልከቱ"
      : "Explore Features",

    secure: isAmharic
      ? "ደህንነቱ የተጠበቀ"
      : "Secure",

    roleAccess: isAmharic
      ? "በሚና የተመሰረተ መዳረሻ"
      : "Role-Based Access",

    fastSupport: isAmharic
      ? "ፈጣን ድጋፍ"
      : "Fast Support",

    ticketResolved: isAmharic
      ? "ቲኬት ተፈትቷል"
      : "Ticket Resolved",

    issueClosed: isAmharic
      ? "ችግሩ በተሳካ ሁኔታ ተዘግቷል"
      : "Issue successfully closed",

    supportManagement: isAmharic
      ? "የድጋፍ አስተዳደር"
      : "Support Management",

    centralizedTickets: isAmharic
      ? "የተማከለ ቲኬቶች"
      : "Centralized Tickets",

    userRoles: isAmharic
      ? "የተጠቃሚ ሚናዎች"
      : "User Roles",

    issueResolution: isAmharic
      ? "ፈጣን ችግር መፍትሄ"
      : "Issue Resolution",

    powerfulFeatures: isAmharic
      ? "ኃይለኛ ባህሪያት"
      : "POWERFUL FEATURES",

    everythingTeamNeeds: isAmharic
      ? "የእርስዎ የአይቲ ቡድን የሚፈልገው ሁሉ"
      : "Everything Your IT Team Needs",

    featuresDescription: isAmharic
      ? "ከቲኬት መፍጠር እስከ ቴክኒክ ችግሮችን መፍታት ድረስ ሁሉም ነገር ከአንድ የተማከለ መድረክ ይተዳደራል።"
      : "From creating tickets to resolving technical issues, everything is managed from one centralized platform.",

    ticketManagement: isAmharic
      ? "የቲኬት አስተዳደር"
      : "Ticket Management",

    ticketManagementText: isAmharic
      ? "የድጋፍ ቲኬቶችን ከመጀመሪያ እስከ መጨረሻ ይፍጠሩ፣ ያደራጁ እና ይከታተሉ።"
      : "Create, organize and track support tickets from start to finish.",

    fastResolution: isAmharic
      ? "ፈጣን መፍትሄ"
      : "Fast Resolution",

    fastResolutionText: isAmharic
      ? "ወኪሎች ችግሮችን በፍጥነት ማየት፣ ለደንበኞች መመለስ እና ሁኔታዎችን ማዘመን ይችላሉ።"
      : "Agents can quickly review issues, reply to customers and update their status.",

    secureAccess: isAmharic
      ? "ደህንነቱ የተጠበቀ መዳረሻ"
      : "Secure Access",

    secureAccessText: isAmharic
      ? "በሚና የተመሰረተ መዳረሻ የደንበኛ፣ ወኪል እና አስተዳዳሪ ባህሪያትን ይጠብቃል።"
      : "Role-based access keeps customer, agent and admin features protected.",

    realTimeTracking: isAmharic
      ? "የእውነተኛ ጊዜ ክትትል"
      : "Real-Time Tracking",

    realTimeTrackingText: isAmharic
      ? "የቲኬት ሂደትን ከOpen እስከ In Progress፣ Resolved እና Closed ይከታተሉ።"
      : "Monitor ticket progress from Open to In Progress, Resolved and Closed.",

    teamCollaboration: isAmharic
      ? "የቡድን ትብብር"
      : "Team Collaboration",

    teamCollaborationText: isAmharic
      ? "ደንበኞች እና የድጋፍ ወኪሎች በቲኬት መልሶች በቀጥታ መገናኘት ይችላሉ።"
      : "Customers and support agents communicate directly through ticket replies.",

    centralizedSupport: isAmharic
      ? "የተማከለ ድጋፍ"
      : "Centralized Support",

    centralizedSupportText: isAmharic
      ? "ምድቦችን፣ ቲኬቶችን፣ ግንኙነቶችን እና የድጋፍ መረጃዎችን በአንድ ቦታ ያደራጁ።"
      : "Keep categories, tickets, communication and support information organized.",

    testimonials: isAmharic
      ? "የተጠቃሚዎች አስተያየት"
      : "TESTIMONIALS",

    whatUsersSay: isAmharic
      ? "ተጠቃሚዎቻችን ምን ይላሉ?"
      : "What Our Users Say",

    testimonialsDescription: isAmharic
      ? "የእኛ የእገዛ ዴስክ የአይቲ ድጋፍን እንዴት ቀላል እንደሚያደርገው ይመልከቱ።"
      : "See how our helpdesk makes IT support easier.",

    simpleEasy: isAmharic
      ? "ቀላል እና አመቺ"
      : "Simple and Easy",

    simpleEasyText: isAmharic
      ? "የቲኬት ስርዓቱ የቴክኒክ ችግሮችን ለማሳወቅ እና ሂደታቸውን ለመከታተል በጣም ቀላል ያደርግልኛል።"
      : "The ticket system makes it much easier for me to report technical problems and follow their progress.",

    muchFaster: isAmharic
      ? "በጣም ፈጣን ድጋፍ"
      : "Much Faster Support",

    muchFasterText: isAmharic
      ? "እንደ የድጋፍ ወኪል ቲኬቶችን በፍጥነት ማየት፣ ለደንበኞች መመለስ እና ሁኔታቸውን ማዘመን እችላለሁ።"
      : "As a support agent, I can quickly see tickets, respond to customers, and update their status.",

    everythingPlace: isAmharic
      ? "ሁሉም ነገር በአንድ ቦታ"
      : "Everything in One Place",

    everythingPlaceText: isAmharic
      ? "ቲኬቶችን፣ ተጠቃሚዎችን፣ ምድቦችን እና የድጋፍ መረጃዎችን በአንድ ስርዓት ማግኘት አስተዳደሩን በጣም ቀላል ያደርገዋል።"
      : "Having tickets, users, categories and support information in one system makes management much easier.",

    customer: isAmharic ? "ደንበኛ" : "Customer",
    supportAgent: isAmharic ? "የድጋፍ ወኪል" : "Support Agent",
    administrator: isAmharic ? "አስተዳዳሪ" : "Administrator",

    modernTeams: isAmharic
      ? "ለዘመናዊ የአይቲ ቡድኖች የተዘጋጀ"
      : "BUILT FOR MODERN IT TEAMS",

    controlRequests: isAmharic
      ? "እያንዳንዱን የድጋፍ ጥያቄ በቁጥጥር ስር ያድርጉ።"
      : "Keep every support request under control.",

    builtDescription: isAmharic
      ? "Enterprise IT Helpdesk ድርጅትዎ የቴክኒክ ችግሮችን በስርዓት ለማስተዳደር እና በደንበኞችና በድጋፍ ቡድኖች መካከል ያለውን ግንኙነት ለማደራጀት ያግዛል።"
      : "Enterprise IT Helpdesk gives your organization a structured way to manage technical problems and keep communication between customers and support teams organized.",

    organizedTickets: isAmharic
      ? "የተደራጀ የቲኬት አስተዳደር"
      : "Organized ticket management",

    roleDashboards: isAmharic
      ? "በሚና የተመሰረቱ ዳሽቦርዶች"
      : "Role-based dashboards",

    ticketReplies: isAmharic
      ? "የቲኬት መልሶች እና ግንኙነት"
      : "Ticket replies and communication",

    statusTracking: isAmharic
      ? "የሁኔታ እና ቅድሚያ ክትትል"
      : "Status and priority tracking",

    simpleWorkflow: isAmharic
      ? "ቀላል የስራ ሂደት"
      : "SIMPLE WORKFLOW",

    howItWorks: isAmharic
      ? "እንዴት ይሰራል?"
      : "How It Works",

    workflowDescription: isAmharic
      ? "የቴክኒክ ድጋፍ ማግኘት ቀላል ነው።"
      : "Getting technical support is simple.",

    createTicket: isAmharic
      ? "ቲኬት ይፍጠሩ"
      : "Create a Ticket",

    createTicketText: isAmharic
      ? "የቴክኒክ ችግርዎን ይግለጹ እና የድጋፍ ጥያቄ ያስገቡ።"
      : "Describe your technical issue and submit a support request.",

    getSupport: isAmharic
      ? "ድጋፍ ያግኙ"
      : "Get Support",

    getSupportText: isAmharic
      ? "ወኪል ጥያቄዎን ይመረምራል እና ከእርስዎ ጋር ይገናኛል።"
      : "An agent reviews your request and communicates with you.",

    resolveIssue: isAmharic
      ? "ችግሩን ይፍቱ"
      : "Resolve the Issue",

    resolveIssueText: isAmharic
      ? "ችግሩ እስኪፈታ እና እስኪዘጋ ድረስ ቲኬቱን ይከታተሉ።"
      : "Follow the ticket until the issue is resolved and closed.",

    ready: isAmharic
      ? "ድጋፍ ለማግኘት ዝግጁ ነዎት?"
      : "Ready to Get Support?",

    readyDescription: isAmharic
      ? "ወደ መለያዎ ይግቡ እና የአይቲ ድጋፍ ጥያቄዎችዎን ዛሬ ማስተዳደር ይጀምሩ።"
      : "Sign in to your account and start managing your IT support requests today.",

    goHelpdesk: isAmharic
      ? "ወደ Helpdesk ይሂዱ"
      : "Go to Helpdesk",

    modernSupport: isAmharic
      ? "ዘመናዊ የአይቲ ድጋፍ አስተዳደር።"
      : "Modern IT support management.",

    followUs: isAmharic
      ? "ይከተሉን"
      : "Follow Us",

    connectSocial: isAmharic
      ? "በማህበራዊ ሚዲያ ከእኛ ጋር ይገናኙ።"
      : "Connect with us on social media.",

    contactUs: isAmharic
      ? "ያግኙን"
      : "Contact Us",

    allRights: isAmharic
      ? "መብቶች በሙሉ የተጠበቁ ናቸው።"
      : "All rights reserved.",
  };

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const features = [
    {
      icon: <CheckCircleOutlined />,
      title: t.ticketManagement,
      text: t.ticketManagementText,
    },
    {
      icon: <ThunderboltOutlined />,
      title: t.fastResolution,
      text: t.fastResolutionText,
    },
    {
      icon: <SafetyOutlined />,
      title: t.secureAccess,
      text: t.secureAccessText,
    },
    {
      icon: <ClockCircleOutlined />,
      title: t.realTimeTracking,
      text: t.realTimeTrackingText,
    },
    {
      icon: <TeamOutlined />,
      title: t.teamCollaboration,
      text: t.teamCollaborationText,
    },
    {
      icon: <CustomerServiceOutlined />,
      title: t.centralizedSupport,
      text: t.centralizedSupportText,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          mode === "dark"
            ? "#141414"
            : "#f5f7fb",
        color:
          mode === "dark"
            ? "#ffffff"
            : "#000000",
        overflowX: "hidden",
      }}
    >
      <header
        style={{
          background:
            mode === "dark"
              ? "rgba(20,20,20,0.95)"
              : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom:
            mode === "dark"
              ? "1px solid #303030"
              : "1px solid #e8e8e8",
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Space size="middle">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #1677ff, #4096ff)",
                color: "#fff",
                fontSize: 22,
              }}
            >
              <ToolOutlined />
            </div>

            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontWeight: 700,
                  color:
                    mode === "dark"
                      ? "#fff"
                      : undefined,
                }}
              >
                Enterprise IT
              </Title>

              <Text
                type="secondary"
                style={{
                  fontSize: 12,
                }}
              >
                HELPDESK
              </Text>
            </div>
          </Space>

          <Space
            size="middle"
            wrap
          >
            <Button
              type="text"
              onClick={() => navigate("/")}
            >
              {t.home}
            </Button>

            <Button
              type="text"
              onClick={() =>
                navigate("/features")
              }
            >
              {t.features}
            </Button>

            <Button
              type="text"
              onClick={() =>
                navigate("/about")
              }
            >
              {t.about}
            </Button>

            <Button
              type="text"
              onClick={() =>
                navigate("/contact")
              }
            >
              {t.contact}
            </Button>

            <Select
              value={language}
              onChange={changeLanguage}
              options={[
                {
                  value: "en",
                  label: "English",
                },
                {
                  value: "am",
                  label: "አማርኛ",
                },
              ]}
              style={{
                width: 105,
              }}
            />

            <Button
              type="text"
              onClick={toggleTheme}
              icon={
                mode === "light" ? (
                  <MoonOutlined />
                ) : (
                  <SunOutlined />
                )
              }
            >
              {mode === "light"
                ? "Dark"
                : "Light"}
            </Button>

            <Button
              type="primary"
              onClick={() =>
                navigate("/login")
              }
            >
              {t.login}
            </Button>
          </Space>
        </div>
      </header>

      <section
        style={{
          position: "relative",
          background:
            "linear-gradient(135deg, #071a33 0%, #0d3b73 55%, #1677ff 100%)",
          color: "#fff",
          padding: "80px 24px 100px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Row
            gutter={[50, 50]}
            align="middle"
          >
            <Col xs={24} lg={13}>
              <Text
                style={{
                  color: "#91caff",
                  fontWeight: 600,
                  letterSpacing: 2,
                }}
              >
                {t.platform}
              </Text>

              <Title
                style={{
                  color: "#fff",
                  fontSize:
                    "clamp(38px, 6vw, 68px)",
                  lineHeight: 1.08,
                  marginTop: 18,
                  marginBottom: 24,
                  fontWeight: 800,
                }}
              >
                {t.support}
                <br />
                <span
                  style={{
                    color: "#69b1ff",
                  }}
                >
                  {t.simple}
                </span>
              </Title>

              <Paragraph
                style={{
                  color:
                    "rgba(255,255,255,0.78)",
                  fontSize: 18,
                  lineHeight: 1.8,
                  maxWidth: 650,
                }}
              >
                {t.heroDescription}
              </Paragraph>

              <Space
                wrap
                size="middle"
                style={{
                  marginTop: 24,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={() =>
                    navigate("/login")
                  }
                  style={{
                    height: 52,
                    padding: "0 28px",
                    borderRadius: 10,
                    background: "#fff",
                    color: "#1677ff",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  {t.getStarted}
                </Button>

                <Button
                  size="large"
                  ghost
                  onClick={scrollToFeatures}
                  style={{
                    height: 52,
                    padding: "0 28px",
                    borderRadius: 10,
                  }}
                >
                  {t.exploreFeatures}
                </Button>
              </Space>

              <Row
                gutter={[24, 16]}
                style={{
                  marginTop: 45,
                }}
              >
                <Col>
                  <Space>
                    <CheckCircleOutlined
                      style={{
                        color: "#95de64",
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      {t.secure}
                    </Text>
                  </Space>
                </Col>

                <Col>
                  <Space>
                    <CheckCircleOutlined
                      style={{
                        color: "#95de64",
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      {t.roleAccess}
                    </Text>
                  </Space>
                </Col>

                <Col>
                  <Space>
                    <CheckCircleOutlined
                      style={{
                        color: "#95de64",
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      {t.fastSupport}
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={11}>
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
                  alt="IT support team working together"
                  style={{
                    width: "100%",
                    height: 430,
                    objectFit: "cover",
                    borderRadius: 24,
                    boxShadow:
                      "0 30px 70px rgba(0,0,0,0.35)",
                  }}
                />

                <Card
                  size="small"
                  style={{
                    position: "absolute",
                    left: -25,
                    bottom: 25,
                    width: 220,
                    borderRadius: 14,
                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.25)",
                  }}
                >
                  <Space>
                    <CheckCircleOutlined
                      style={{
                        fontSize: 25,
                        color: "#52c41a",
                      }}
                    />

                    <div>
                      <Text strong>
                        {t.ticketResolved}
                      </Text>

                      <br />

                      <Text type="secondary">
                        {t.issueClosed}
                      </Text>
                    </div>
                  </Space>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section
        style={{
          background:
            mode === "dark"
              ? "#1f1f1f"
              : "#fff",
          padding: "35px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <Row
            gutter={[30, 30]}
            justify="center"
          >
            <Col xs={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: "#1677ff",
                  }}
                >
                  24/7
                </Title>

                <Text type="secondary">
                  {t.supportManagement}
                </Text>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: "#1677ff",
                  }}
                >
                  100%
                </Title>

                <Text type="secondary">
                  {t.centralizedTickets}
                </Text>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: "#1677ff",
                  }}
                >
                  3
                </Title>

                <Text type="secondary">
                  {t.userRoles}
                </Text>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div style={{ textAlign: "center" }}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: "#1677ff",
                  }}
                >
                  Fast
                </Title>

                <Text type="secondary">
                  {t.issueResolution}
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section
        id="features"
        style={{
          padding: "90px 24px",
          background:
            mode === "dark"
              ? "#141414"
              : "#f5f7fb",
        }}
      >
        <div
          style={{
            maxWidth: 1150,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 55px",
            }}
          >
            <Text
              style={{
                color: "#1677ff",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {t.powerfulFeatures}
            </Text>

            <Title
              level={2}
              style={{
                fontSize: 38,
                marginTop: 10,
                color:
                  mode === "dark"
                    ? "#fff"
                    : undefined,
              }}
            >
              {t.everythingTeamNeeds}
            </Title>

            <Paragraph type="secondary">
              {t.featuresDescription}
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {features.map(
              (feature, index) => (
                <Col
                  xs={24}
                  sm={12}
                  lg={8}
                  key={index}
                >
                  <Card
                    hoverable
                    style={{
                      height: "100%",
                      borderRadius: 16,
                    }}
                    styles={{
                      body: {
                        padding: 28,
                      },
                    }}
                  >
                    <div
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        background: "#e6f4ff",
                        color: "#1677ff",
                        fontSize: 25,
                        marginBottom: 20,
                      }}
                    >
                      {feature.icon}
                    </div>

                    <Title level={4}>
                      {feature.title}
                    </Title>

                    <Paragraph type="secondary">
                      {feature.text}
                    </Paragraph>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </div>
      </section>

      <section
        style={{
          background:
            mode === "dark"
              ? "#1f1f1f"
              : "#fff",
          padding: "90px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            <Text
              style={{
                color: "#1677ff",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {t.testimonials}
            </Text>

            <Title
              level={2}
              style={{
                color:
                  mode === "dark"
                    ? "#fff"
                    : undefined,
              }}
            >
              {t.whatUsersSay}
            </Title>

            <Paragraph type="secondary">
              {t.testimonialsDescription}
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Title level={4}>
                  "{t.simpleEasy}"
                </Title>

                <Paragraph type="secondary">
                  "{t.simpleEasyText}"
                </Paragraph>

                <Text strong>
                  — Yodit Bekele
                </Text>

                <br />

                <Text type="secondary">
                  {t.customer}
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Title level={4}>
                  "{t.muchFaster}"
                </Title>

                <Paragraph type="secondary">
                  "{t.muchFasterText}"
                </Paragraph>

                <Text strong>
                  — Abel Tesfaye
                </Text>

                <br />

                <Text type="secondary">
                  {t.supportAgent}
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Title level={4}>
                  "{t.everythingPlace}"
                </Title>

                <Paragraph type="secondary">
                  "{t.everythingPlaceText}"
                </Paragraph>

                <Text strong>
                  — Sara Alemu
                </Text>

                <br />

                <Text type="secondary">
                  {t.administrator}
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section
        style={{
          background:
            mode === "dark"
              ? "#141414"
              : "#fff",
          padding: "90px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1150,
            margin: "0 auto",
          }}
        >
          <Row
            gutter={[60, 50]}
            align="middle"
          >
            <Col xs={24} lg={12}>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=85"
                alt="IT support team"
                style={{
                  width: "100%",
                  height: 420,
                  objectFit: "cover",
                  borderRadius: 20,
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.12)",
                }}
              />
            </Col>

            <Col xs={24} lg={12}>
              <Text
                style={{
                  color: "#1677ff",
                  fontWeight: 600,
                }}
              >
                {t.modernTeams}
              </Text>

              <Title
                level={2}
                style={{
                  fontSize: 38,
                  marginTop: 12,
                  color:
                    mode === "dark"
                      ? "#fff"
                      : undefined,
                }}
              >
                {t.controlRequests}
              </Title>

              <Paragraph
                type="secondary"
                style={{
                  fontSize: 17,
                  lineHeight: 1.8,
                }}
              >
                {t.builtDescription}
              </Paragraph>

              <Space
                direction="vertical"
                size="middle"
              >
                <Space>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                    }}
                  />

                  <Text>
                    {t.organizedTickets}
                  </Text>
                </Space>

                <Space>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                    }}
                  />

                  <Text>
                    {t.roleDashboards}
                  </Text>
                </Space>

                <Space>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                    }}
                  />

                  <Text>
                    {t.ticketReplies}
                  </Text>
                </Space>

                <Space>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                    }}
                  />

                  <Text>
                    {t.statusTracking}
                  </Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </div>
      </section>

      <section
        style={{
          padding: "90px 24px",
          background:
            mode === "dark"
              ? "#1f1f1f"
              : "#f5f7fb",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              color: "#1677ff",
              fontWeight: 600,
            }}
          >
            {t.simpleWorkflow}
          </Text>

          <Title
            level={2}
            style={{
              fontSize: 38,
              color:
                mode === "dark"
                  ? "#fff"
                  : undefined,
            }}
          >
            {t.howItWorks}
          </Title>

          <Paragraph type="secondary">
            {t.workflowDescription}
          </Paragraph>

          <Row
            gutter={[40, 40]}
            style={{
              marginTop: 50,
            }}
          >
            <Col xs={24} md={8}>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#1677ff",
                }}
              >
                01
              </div>

              <Title level={4}>
                {t.createTicket}
              </Title>

              <Text type="secondary">
                {t.createTicketText}
              </Text>
            </Col>

            <Col xs={24} md={8}>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#1677ff",
                }}
              >
                02
              </div>

              <Title level={4}>
                {t.getSupport}
              </Title>

              <Text type="secondary">
                {t.getSupportText}
              </Text>
            </Col>

            <Col xs={24} md={8}>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#1677ff",
                }}
              >
                03
              </div>

              <Title level={4}>
                {t.resolveIssue}
              </Title>

              <Text type="secondary">
                {t.resolveIssueText}
              </Text>
            </Col>
          </Row>
        </div>
      </section>

      <section
        style={{
          padding: "90px 24px",
          background:
            "linear-gradient(135deg, #0d3b73, #1677ff)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title
          style={{
            color: "#fff",
            fontSize: 40,
          }}
        >
          {t.ready}
        </Title>

        <Paragraph
          style={{
            color:
              "rgba(255,255,255,0.8)",
            fontSize: 17,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          {t.readyDescription}
        </Paragraph>

        <Button
          size="large"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate("/login")}
          style={{
            marginTop: 28,
            height: 52,
            padding: "0 30px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {t.goHelpdesk}
        </Button>
      </section>

      <footer
        style={{
          background: "#071a33",
          padding: "55px 24px 25px",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <Row gutter={[40, 40]}>
            <Col xs={24} md={8}>
              <Space
                size="middle"
                align="start"
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#1677ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  <ToolOutlined />
                </div>

                <div>
                  <Title
                    level={4}
                    style={{
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Enterprise IT Helpdesk
                  </Title>

                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.6)",
                    }}
                  >
                    {t.modernSupport}
                  </Text>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={8}>
              <Title
                level={4}
                style={{
                  color: "#fff",
                }}
              >
                {t.contactUs}
              </Title>

              <Paragraph
                style={{
                  color:
                    "rgba(255,255,255,0.65)",
                  marginBottom: 8,
                }}
              >
                📍 Bahir Dar, Ethiopia
              </Paragraph>

              <Paragraph
                style={{
                  color:
                    "rgba(255,255,255,0.65)",
                  marginBottom: 8,
                }}
              >
                📧 support@enterprisehelpdesk.com
              </Paragraph>

              <Paragraph
                style={{
                  color:
                    "rgba(255,255,255,0.65)",
                }}
              >
                📞 +251 900 000 000
              </Paragraph>
            </Col>

            <Col xs={24} md={8}>
              <Title
                level={4}
                style={{
                  color: "#fff",
                }}
              >
                {t.followUs}
              </Title>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.65)",
                }}
              >
                {t.connectSocial}
              </Text>

              <Space
                size="large"
                style={{
                  marginTop: 20,
                }}
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaTiktok />
                </a>
              </Space>
            </Col>
          </Row>

          <Divider
            style={{
              borderColor:
                "rgba(255,255,255,0.12)",
              margin: "40px 0 20px",
            }}
          />

          <div
            style={{
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color:
                  "rgba(255,255,255,0.5)",
              }}
            >
              © 2026 Enterprise IT Helpdesk.{" "}
              {t.allRights}
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;