import styled from '@emotion/styled';
import React from 'react';
import Icon, { IconKeyType } from './common/Icon';

interface Props {
  icon: IconKeyType;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IconInputLine({ icon, value, type = 'text', onChange }: Props) {
  return (
    <Wrapper>
      <IconWrapper type={icon} color={'FFFFFF'} />
      <Input value={value} onChange={onChange} type={type} />
    </Wrapper>
  );
}

const Wrapper = styled.span`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
`;

const IconWrapper = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.gray200};
  padding-left: 56px;
  color: ${({ theme }) => theme.colors.text.bold};
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export default IconInputLine;
