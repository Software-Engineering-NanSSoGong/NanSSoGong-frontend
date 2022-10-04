import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles';
import { Typography } from './common';

interface Props {
  title: string;
  src: string;
  href: string;
}

function ClickableDinnerCard({ title, src, href }: Props) {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(href)}>
      <Image src={src} alt={title + 'img'} />
      <Name type='h4' color={theme.palette.gray50} textAlign='center'>
        {title}
      </Name>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    scale: 1.05;
    opacity: 0.8;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Name = styled(Typography)`
  background-color: ${theme.colors.primary.blue};
  padding-block: 23px;
  border-radius: 0px 0px 16px 16px;
`;

export default ClickableDinnerCard;
