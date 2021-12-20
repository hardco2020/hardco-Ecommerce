import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import FeaturedInfo from "./FeaturedInfo";
import WidgetLg from "./WidgetLg";
import WidgetSm from "./WidgetSm";
import { Container } from "./Theme";
import { useGetStatsQuery } from "../../redux/api";

const HomeWidget = styled.div`
  display: flex;
  margin: 20px;
`;

export interface userStatsInterface {
  name:string;
  "Active User":number;
}
const Home = () => {
  const [userStats, setUserStats] = useState<userStatsInterface[]>([]);
  const { data, isLoading, isError } = useGetStatsQuery();
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    !isError &&
      !isLoading &&
      data &&
      data.data.map((item) =>
        setUserStats((prev: userStatsInterface[]) => [
          ...prev,
          { name: Months[parseInt(item._id) - 1], "Active User": item.total },
        ])
      );
  }, [Months, data, isError, isLoading]);
  return (
    <Container>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" dataKey="Active User" />
      <HomeWidget>
        <WidgetSm />
        <WidgetLg />
      </HomeWidget>
    </Container>
  );
};

export default Home;
