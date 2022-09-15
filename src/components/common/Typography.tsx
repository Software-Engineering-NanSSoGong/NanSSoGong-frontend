import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';
import { ComponentProps, PropsWithChildren } from 'react';
import { theme } from '../../styles';
import { PalleteValueType } from '../../styles/theme/colors';
import { FontKeyType } from '../../styles/theme/fonts';

type SemanticTag = 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface Props extends ComponentProps<'div'> {
  type: FontKeyType;
  textAlign?: CSSProperties['textAlign'];
  color?: PalleteValueType;
}

function Typography({
  type,
  children,
  textAlign = 'start',
  color = theme.colors.text.general,
  ...restProps
}: PropsWithChildren<Props>) {
  const semanticTag: SemanticTag = type.indexOf('body') === -1 ? (type as SemanticTag) : 'div';

  return (
    <Wrapper type={type} textAlign={textAlign} color={color} {...restProps} as={semanticTag}>
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'type' | 'textAlign' | 'color'>;

const Wrapper = styled.div<StyleProps>`
  ${({ type, textAlign, color }) => css`
    ${theme.fonts[type]};
    text-align: ${textAlign};
    color: ${color};
  `}
`;

export default Typography;
