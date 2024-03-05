import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Piechart from "../components/Pie";
import { useNavigate } from "react-router-dom";

const DashboardHeader = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 60px;

  border-bottom: 1px solid black;

  box-sizing: border-box;
`;

const DashboardTitleContainer = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const DashboardTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;

  display: flex;
  align-items: flex-end;
`;

const DashboardSubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const DashboardMainContainer = styled.main`
  width: 100vw;
  display: flex;
  padding: 20px;

  justify-content: center;

  box-sizing: border-box;
`;

const DashboardChartContainer = styled.div`
  border-radius: 10px;
  background-color: #f1f3f5;
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-right: 100px;
`;

const DashboardSearchKeyword = styled.div`
  width: 200px;
`;

const DashboardSearchTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  background-color: #4169e1;

  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  border-radius: 10px;
`;

const DashboardSearchItems = styled.div`
  font-size: 1rem;
  font-weight: 500;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.4px solid black;

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: #f1f3f5;
    font-weight: 700;
  }
`;

const Footer = styled.footer`
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 60px;
  box-sizing: border-box;

  background-color: #f1f3f5;

  position: fixed;
  bottom: 0;
  left: 0;

  font-size: 0.8rem;
  font-weight: 700;

  opacity: 0.8;
`;

const Dashboard = () => {
  const l = ["국민은행", "기업은행", "삼성전자", "네이버", "SK하이닉스", "카카오"];
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    setSearch(searchParam);
  }, []);

  return (
    <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
      <DashboardHeader></DashboardHeader>
      <DashboardTitleContainer>
        <DashboardTitle>
          {search}&nbsp;
          <DashboardSubTitle>에 대한 검색 결과입니다.</DashboardSubTitle>
        </DashboardTitle>
      </DashboardTitleContainer>
      <DashboardMainContainer>
        <DashboardChartContainer>
          <Piechart />
        </DashboardChartContainer>
        <DashboardSearchKeyword>
          <DashboardSearchTitle>이전 검색어</DashboardSearchTitle>
          {l.map((item, idx) => (
            <DashboardSearchItems
              onClick={() => {
                setSearch(item);
              }}
              key={idx}
            >
              {item}
            </DashboardSearchItems>
          ))}
        </DashboardSearchKeyword>
      </DashboardMainContainer>
      <Footer>
        <div>© 2024 정현철 All Rights Reserved.</div>
        <a href="https://github.com/hyeeeonc/bank_run_detector">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </Footer>
    </div>
  );
};

export default Dashboard;
