import styled from '@emotion/styled';
import Button, { ButtonHierarchy } from './Button';

interface Props {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'small' | 'large';
  onClickPlusIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickMinusIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function NumberInput({
  value,
  type = 'small',
  onChange,
  onClickPlusIcon,
  onClickMinusIcon,
}: Props) {
  return (
    <Wrapper>
      <Input value={value} onChange={onChange} type={type} pattern='\d*' />
      <PlusIcon onClick={onClickPlusIcon} hierarchy={ButtonHierarchy.Parent}>
        ➕
      </PlusIcon>
      <MinusIcon onClick={onClickMinusIcon} hierarchy={ButtonHierarchy.Parent}>
        ➖
      </MinusIcon>
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'type'>;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<StyleProps>`
  width: 100%;
  padding: 0;
  text-align: center;
  border: none;
  outline: none;
  padding: ${({ type }) => (type === 'large' ? '18px' : '8px')};
  border-radius: ${({ type }) => (type === 'large' ? '16px' : '0 0 16px 16px')};
  font-size: ${({ type }) => (type === 'large' ? '16px' : '12px')};
`;

const PlusIcon = styled(Button)<StyleProps>`
  position: absolute;
  right: ${({ type }) => (type === 'large' ? '12px' : '8px')};
`;

const MinusIcon = styled(Button)<StyleProps>`
  position: absolute;
  left: ${({ type }) => (type === 'large' ? '12px' : '8px')};
`;

export default NumberInput;
