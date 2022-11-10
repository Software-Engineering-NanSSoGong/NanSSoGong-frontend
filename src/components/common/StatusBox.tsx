import styled from '@emotion/styled';
import Typography from './Typography';

export type StatusBoxType = 'before' | 'now' | 'delivery' | 'done';

interface Props {
  type: StatusBoxType;
  variants: 'outlined' | 'filled';
  label: string;
}

function StatusBox({ type, variants, label }: Props) {
  return (
    <Wrapper type={type} variants={variants}>
      <Typography type='body5' textAlign='center'>
        {label}
      </Typography>
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'type' | 'variants'>;

const Wrapper = styled.div<StyleProps>`
  max-width: 100px;
  max-height: 20px;
  background-color: ${({ variants, type, theme }) => {
    if (variants === 'filled') {
      switch (type) {
        case 'danger':
          return theme.palette.red200;
        case 'success':
          return theme.palette.green200;
        case 'primary':
          return theme.palette.blue200;
        case 'warning':
          return theme.palette.yellow200;
        default:
          return theme.palette.blue200;
      }
    }
    return 'transparent';
  }};
  border: ${({ variants, type, theme }) => {
    if (variants === 'outlined') {
      switch (type) {
        case 'danger':
          return `1px solid ${theme.palette.red500}`;
        case 'success':
          return `1px solid ${theme.palette.green500}`;
        case 'primary':
          return `1px solid ${theme.palette.blue500}`;
        case 'warning':
          return `1px solid ${theme.palette.yellow500}`;
        default:
          return `1px solid ${theme.palette.blue500}`;
      }
    }
    return 'none';
  }};
  padding: 4px 20px;
  border-radius: 16px;
  & > div {
    color: ${({ type, theme }) => {
      switch (type) {
        case 'danger':
          return theme.colors.primary.red;
        case 'success':
          return theme.colors.primary.green;
        case 'primary':
          return theme.colors.primary.blue;
        case 'warning':
          return theme.colors.primary.yellow;
        default:
          return theme.colors.primary.blue;
      }
    }};
  }
`;

export default StatusBox;
