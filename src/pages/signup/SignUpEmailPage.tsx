import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';

function SignUpEmailPage() {
  const [signUpState] = useRecoilState(RecoilSignUpState);

  return <Wrapper>{signUpState.userType}</Wrapper>;
}

const Wrapper = styled.main``;

export default SignUpEmailPage;
