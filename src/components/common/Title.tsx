import styled from '@emotion/styled';
import Typography from './Typography';

interface Props {
  title: string;
}

function Title({ title }: Props) {
  return (
    <Wrapper type='h5' textAlign='center'>
      {title}
    </Wrapper>
  );
}

const Wrapper = styled(Typography)`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
`;

export default Title;
