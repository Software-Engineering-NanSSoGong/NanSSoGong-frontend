import styled from '@emotion/styled';
import LoginBox from '../components/LoginBox';

function LoginPage() {
  return (
    <Wrapper>
      <LoginBox />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
