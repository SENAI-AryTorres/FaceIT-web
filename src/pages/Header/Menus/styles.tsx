import styled from 'styled-components';

export const Sidebar = styled.div`
  top: 0;
  margin-top: -80px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  font-size: 22px;
  color: #66788a;
  margin-top: 4px;
  font-family: Roboto, serif;
  padding: 25px;

  .MuiTypography-body2 {
    font-size: 18px;
    padding: 15px;
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  width: 220px;
  background: #fff;
  flex-wrap: wrap;
`;
export const SidebarAvatar = styled.div`
  position: absolute;
  display: block;
  align-items: center;
  justify-content: center;
  width: 220px;
  max-height: 200px;
  height: 200px;
  top: 0;

  text-decoration: none;

  align-items: center;
  transition: transform 0.2s;
  text-align: center;
  img {
    border-radius: 50%;
    width: 100px;
    margin: 16px 16px;
  }
  div {
    text-align: center;
    width: 200px;
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: #3d3d4d;
      width: 200px;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
`;
