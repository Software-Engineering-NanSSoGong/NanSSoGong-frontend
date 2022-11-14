import styled from '@emotion/styled';
import React from 'react';
import { theme } from '../styles';
import { PalleteValueType } from '../styles/theme/colors';
import { Typography } from './common';

interface Props {
  title: string;
  labelColor: PalleteValueType;
  inputBackgroundColor: PalleteValueType;
  inputColor: PalleteValueType;
  placeholders: string[];
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  values: any[];
  pattern?: React.InputHTMLAttributes<HTMLInputElement>['pattern'];
  maxLength?: number;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const STRING_MAX_LENGTH = 200;

function LabelWithMultipleInput({
  title,
  type,
  placeholders,
  labelColor,
  inputBackgroundColor,
  inputColor,
  values,
  pattern = '',
  maxLength = STRING_MAX_LENGTH,
  handleChangeInput,
}: Props) {
  return (
    <Wrapper>
      <Lines>
        <Typography type='h4' color={labelColor}>
          {title}
        </Typography>
        <Inputs>
          {placeholders.map((placeholder, idx) => (
            <Input
              key={idx}
              type={type}
              name={placeholder}
              placeholder={placeholder}
              maxLength={maxLength}
              pattern={pattern}
              value={values[idx] ?? ''}
              inputBackgroundColor={inputBackgroundColor}
              inputColor={inputColor}
              onChange={handleChangeInput}
            />
          ))}
        </Inputs>
      </Lines>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type InputStyleProps = Pick<Props, 'inputBackgroundColor' | 'inputColor'>;

const Input = styled.input<InputStyleProps>`
  width: 100%;
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: ${(props) => props.inputBackgroundColor};
  padding-left: 16px;
  color: ${(props) => props.inputColor};
  font-size: 16px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${theme.palette.gray100};
  }
`;
const Lines = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
// const LabelWithInput = styled.section`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

const Inputs = styled.section`
  display: flex;
  gap: 40px;
`;
export default LabelWithMultipleInput;
