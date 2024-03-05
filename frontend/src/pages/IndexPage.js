import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AppMain = styled.div`
  background-image: url("./images/landing.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    background: black;
    z-index: -1;
    inset: 0;
    opacity: 0.5;
  }
`;

const AppTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AppMainText = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: 700;

  transition: all 0.5s ease;

  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AppSubText = styled.div`
  margin: 20px 0;

  color: white;
  font-size: 1rem;
  font-weight: 700;

  transition: all 0.5s ease;

  animation: fadeInSecond 2s;

  @keyframes fadeInSecond {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AppInput = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background-color: white;
  transition: all 0.5s ease;

  margin-top: 20px;

  width: 300px;

  &:focus {
    background-color: rgba(0, 0, 0, 0.7);
  }

  animation: fadeInThird 3s;

  @keyframes fadeInThird {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    66% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function IndexPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/dashboard?search=" + search);
    }
  };
  return (
    <div className="App">
      <AppMain>
        <AppTextContainer>
          <AppMainText>기업의 여론이 궁금하신가요?</AppMainText>
          <AppSubText>SNS를 통해 사람들의 생각을 확인해 보세요.</AppSubText>
        </AppTextContainer>
        <AppInput
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={handleSearch}
          type="text"
          placeholder="검색어를 입력하세요."
        ></AppInput>
      </AppMain>
    </div>
  );
}

export default IndexPage;
