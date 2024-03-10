import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoStatsChartOutline } from "react-icons/io5";
import {
  MdInfoOutline,
  MdAddCircleOutline,
  MdExplore,
  MdOutlineCleaningServices,
} from "react-icons/md";

const links = [
  {
    text: "explore",
    path: ".",
    icon: <MdExplore />,
  },
  {
    text: "add post",
    // path: "add",
    icon: <MdAddCircleOutline />,
  },
  {
    text: "employments",
    path: "employments",
    icon: <MdOutlineCleaningServices />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <CgProfile />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoStatsChartOutline />,
  },
  {
    text: "about",
    path: "about",
    icon: <MdInfoOutline />,
  },
];

export default links;
