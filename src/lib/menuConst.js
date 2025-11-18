"use client";
import {
  DashboardOutlined,
  DesktopOutlined,
  TeamOutlined,
  CreditCardOutlined,
  SettingOutlined,
  QrcodeOutlined,
  ReadOutlined,
  BellFilled,
} from "@ant-design/icons";
import Link from "next/link";

const MENU_ITEMS = [
  {
    key: "1",
    icon: <DashboardOutlined style={{ color: "#9f22a8" }} />,
    label: <Link href="/">Dashboard</Link>,
    permission: "",
  },
  {
    key: "2",
    icon: <DesktopOutlined style={{ color: "#f54263" }} />,
    label: "Display Service",
    permission: [
      "DISPLAY_ADS_LIST_READ",
      "DISPLAY_ADS_STREAMING_READ",
      "DISPLAY_SLIDER_READ",
      "DISPLAY_PLAYLIST_READ",
    ],
    children: [
      {
        key: "2.1",
        link: "/display/ads",
        permission: ["DISPLAY_ADS_LIST_READ"],
        label: <Link href="/display/ads">Ads List</Link>,
      },
      {
        key: "2.2",
        link: "/display/slider",
        permission: ["DISPLAY_SLIDER_READ"],
        label: <Link href="/display/slider">Ads Slider List</Link>,
      },
      {
        key: "2.3",
        link: "/display/streaming",
        permission: ["DISPLAY_ADS_LIST_READ"],
        label: <Link href="/display/streaming">Ads Streaming</Link>,
      },
      {
        key: "2.4",
        link: "/display/playlist",
        permission: ["DISPLAY_PLAYLIST_READ"],
        label: <Link href="/display/playlist">Playlist</Link>,
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined style={{ color: "#d6d011" }} />,
    label: "CMS",
    permission: ["CMS_USER_WATCH", "ACCESS_WATCH"],
    children: [
      {
        key: "3.1",
        link: "/cms/user",
        permission: ["CMS_USER_WATCH"],
        label: <Link href="/cms/user">CMS User</Link>,
      },
      {
        key: "3.3",
        link: "/cms/access_level",
        permission: ["ACCESS_WATCH"],
        label: <Link href="/cms/access_level">CMS Access Level</Link>,
      },
    ],
  },
  {
    key: "4",
    icon: <TeamOutlined style={{ color: "orange" }} />,
    label: "Profile Service",
    permission: [
      "PROFILE_SERVICE_FAVOURITE_READ",
      "PROFILE_SERVICE_USER_DEVICE_READ",
      "PROFILE_SERVICE_LIKE_READ",
      "PROFILE_SERVICE_DOWNLOAD_READ",
      "PROFILE_SERVICE_USER_SHARE_READ",
      "PROFILE_SERVICE_PROFILE_READ",
    ],
    children: [
      {
        key: "4.1",
        link: "/profile_service/profile",
        permission: ["PROFILE_SERVICE_PROFILE_READ"],
        label: <Link href="/profile_service/profile">Profile</Link>,
      },
    ],
  },
  {
    key: "5",
    icon: <CreditCardOutlined style={{ color: "purple" }} />,
    label: "Subscription",
    permission: [
      "SUBSCRIPTION_PAYMENT_GATEWAY_READ",
      "SUBSCRIPTION_PAYMENT_PLAN_READ",
      "SUBSCRIPTION_SUBSCRIPTION_READ",
      "SUBSCRIPTION_TRANSATION_READ",
    ],
    children: [
      {
        key: "5.1",
        link: "/subscription_service/payment_gateway",
        permission: ["SUBSCRIPTION_PAYMENT_PLAN_READ"],
        label: (
          <Link href="/subscription_service/payment_gateway">
            Payment Gateway
          </Link>
        ),
      },
      // {
      //   key: "5.2",
      //   link: "/subscription_service/subscription_plan",
      //   permission: ["SUBSCRIPTION_PAYMENT_PLAN_READ"],
      //   label: (
      //     <Link href="/subscription_service/subscription_plan">
      //       Subscription Plan
      //     </Link>
      //   ),
      // },
    ],
  },
  {
    key: "6",
    icon: <QrcodeOutlined style={{ color: "red" }} />,
    label: "Promocode Service",
    permission: ["PROMOCODE_SERVICE_READ"],
    children: [
      {
        key: "6.1",
        link: "/promocode_service/promocode",
        permission: ["PROMOCODE_SERVICE_READ"],
        label: <Link href="/promocode_service/promocode">Promocode</Link>,
      },
    ],
  },
  {
    key: "7",
    icon: <ReadOutlined style={{ color: "green" }} />,
    label: "Content Service",
    permission: [
      "CONTENT_ROlE_READ",
      "CONTENT_TAG_READ",
      "CONTENT_STREAMING_READ",
      "CONTENT_GENRE_READ",
      "CONTENT_MOVIE_READ",
      "CONTENT_TRAILER_READ",
      "CONTENT_MOVIE_READ",
    ],
    children: [
      {
        key: "7.1",
        link: "/content/role",
        permission: ["CONTENT_ROlE_READ"],
        label: <Link href="/content/role">Role</Link>,
      },
      {
        key: "7.2",
        link: "/content/tag",
        permission: ["CONTENT_TAG_READ"],
        label: <Link href="/content/tag">Tag</Link>,
      },
      // {
      //   key: "7.3",
      //   link: "/content/streaming",
      //   permission: ["CONTENT_STREAMING_READ"],
      //   label: <Link href="/content/streaming">Streaming</Link>,
      // },
      {
        key: "7.4",
        link: "/content/genre",
        permission: ["CONTENT_GENRE_READ"],
        label: <Link href="/content/genre">Genre</Link>,
      },

      {
        key: "7.5",
        link: "/content/trailer",
        permission: ["CONTENT_TRAILER_READ"],
        label: <Link href="/content/trailer">Trailer</Link>,
      },
      {
        key: "7.6",
        link: "/content/credit",
        permission: ["CONTENT_CREDIT_READ"],
        label: <Link href="/content/credit">Credit</Link>,
      },
      {
        key: "7.7",
        link: "/content/series",
        permission: ["CONTENT_SERIE_READ"],
        label: <Link href="/content/series">Series</Link>,
      },
      {
        key: "7.8",
        link: "/content/movie",
        permission: ["CONTENT_MOVIE_READ"],
        label: <Link href="/content/movie">Movie</Link>,
      },
    ],
  },
  {
    key: "8",
    icon: <QrcodeOutlined style={{ color: "purple" }} />,
    label: "Epin Service",
    permission: [
      "EPIN_EPIN_READ",
      "EPIN_EPIN_GENERATION_JOB_READ",
      "EPIN_PACKAGES_READ",
      "EPIN_PACKAGES_UPDATE",
      "EPIN_GENERATION_JOB_ACTIVATE",
    ],
    children: [
      {
        key: "8.1",
        link: "/epin_service/epingenerate",
        permission: [
          "EPIN_EPIN_GENERATION_JOB_READ",
          "EPIN_GENERATION_JOB_READ",
          "EPIN_EPIN_READ",
          "EPIN_GENERATION_JOB_ACTIVATE",
        ],
        label: <Link href="/epin_service/epingenerate">Epin Generate</Link>,
      },
      {
        key: "8.2",
        link: "/epin_service/epinpackage",
        permission: [
          "EPIN_PACKAGES_READ",
          "EPIN_EPIN_READ",
          // "EPIN_PACKAGES_UPDATE",
        ],
        label: <Link href="/epin_service/epinpackage">Epin Packages</Link>,
      },
      {
        key: "8.3",
        link: "/epin_service/daily_epin_list",
        permission: [
          "EPIN_PACKAGES_READ",
          "EPIN_EPIN_READ",
          // "EPIN_PACKAGES_UPDATE",
        ],
        label: <Link href="/epin_service/daily_epin_list">Daily Packages</Link>,
      },
      {
        key: "8.4",
        link: "/epin_service/weekly_epin_list",
        permission: [
          "EPIN_PACKAGES_READ",
          "EPIN_EPIN_READ",
          // "EPIN_PACKAGES_UPDATE",
        ],
        label: (
          <Link href="/epin_service/weekly_epin_list">Weekly Packages</Link>
        ),
      },
      {
        key: "8.5",
        link: "/epin_service/monthly_epin_list",
        permission: [
          "EPIN_PACKAGES_READ",
          "EPIN_EPIN_READ",
          // "EPIN_PACKAGES_UPDATE",
        ],
        label: (
          <Link href="/epin_service/monthly_epin_list">Monthly Packages</Link>
        ),
      },
    ],
  },
  {
    key: "9",
    icon: <BellFilled style={{ color: "skyblue" }} />,
    label: "Notifiction Service",
    permission: ["NOTIFICATION_READ"],
    children: [
      {
        key: "9.1",
        link: "/notification_service/notification",
        permission: ["NOTIFICATION_READ"],
        label: (
          <Link href="/notification_service/notification">Notification</Link>
        ),
      },
    ],
  },
  {
    key: "10",
    icon: <QrcodeOutlined style={{ color: "green" }} />,
    label: "Setting",
    permission: ["SETTING_READ"],
    children: [
      {
        key: "10.1",
        link: "/setting/FAQs",
        permission: ["SETTING_READ"],
        label: <Link href="/setting/FAQs">FAQs</Link>,
      },
      {
        key: "10.2",
        link: "/setting/termsandconditions",
        permission: ["SETTING_READ"],
        label: (
          <Link href="/setting/termsandconditions">Terms And Conditions</Link>
        ),
      },
      {
        key: "10.3",
        link: "/setting/privacyandpolicy",
        permission: ["SETTING_READ"],
        label: <Link href="/setting/privacyandpolicy">Privacy And Policy</Link>,
      },
    ],
  },
];
export { MENU_ITEMS };
