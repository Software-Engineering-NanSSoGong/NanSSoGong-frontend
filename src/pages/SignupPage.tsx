import styled from '@emotion/styled';
import SignupBox from '../components/SignupBox';

function SignupPage() {
  return (
    <Wrapper>
      <SignupBox />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignupPage;
