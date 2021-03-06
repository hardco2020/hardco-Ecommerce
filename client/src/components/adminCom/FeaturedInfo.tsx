import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useGetIncomeQuery } from "../../redux/api";

const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const FeaturedTitle = styled.span`
  font-size: 20px;
`;
const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;
const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;
const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const FeaturedSub = styled.span`
  font-size: 15px;
  color: gray;
`;
const ArrowDown = styled(ArrowDownward)`
  font-size: 16px;
  margin-left: 5px;
  color: red;
`;
const ArrowUp = styled(ArrowUpward)`
  font-size: 16px;
  margin-left: 5px;
  color: green;
`;
const FeaturedInfo = () => {
  const { data, isError, isLoading } = useGetIncomeQuery();
  console.log(data);
  // console.log(income);
  // console.log(percent);
  return (
    <FeaturedContainer>
      <FeaturedItem>
        <FeaturedTitle>Revanue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>
            {isError
              ? "Error"
              : isLoading
              ? "Loading..."
              : data && `$` + data[0].total}
          </FeaturedMoney>
          <FeaturedMoneyRate>
          {isError
              ? "Error"
              : isLoading
              ? "Loading..."
              : data &&  Math.floor(data[0].total*100/data[1].total-100)+"%"}
          </FeaturedMoneyRate>
          {isError
              ? "Error"
              : isLoading
              ? "Loading..."
              : data &&  Math.floor(data[0].total*100/data[1].total-100) < 0 ? <ArrowDown /> : <ArrowUp />} 
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Upcoming!</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$4,415</FeaturedMoney>
          <FeaturedMoneyRate>-1.4</FeaturedMoneyRate>
          <ArrowDown />
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Upcoming!</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,225</FeaturedMoney>
          <FeaturedMoneyRate>+2.4</FeaturedMoneyRate>
          <ArrowUp />
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </FeaturedContainer>
  );
};

export default FeaturedInfo;
