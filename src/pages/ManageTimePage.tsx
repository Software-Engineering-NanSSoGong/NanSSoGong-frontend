import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { OperationHour } from '../@types';
import { HomeService } from '../api';
import {
  Button,
  LabelWithMultipleInput,
  SideMenuListWithEmployee,
  TitleWithLine,
  Typography,
} from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { theme } from '../styles';

function ManageTimePage() {
  const [operationHour, setOperationHour] = useState<OperationHour>({} as OperationHour);

  const handleChangeMultipleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('Hour')) {
      const nextValue = Number(value) > 23 ? 23 : value;
      setOperationHour((prev) => ({ ...prev, [name]: nextValue }));
    } else {
      const nextValue = Number(value) > 59 ? 0 : value;
      setOperationHour((prev) => ({ ...prev, [name]: nextValue }));
    }
  };

  const handleClickChangeButton = async () => {
    await HomeService.changeOperatingHours(operationHour);
    alert('변경이 완료되었습니다.');
  };

  useEffect(() => {
    (async () => {
      const res = await HomeService.getCurrentOperatingHours();
      setOperationHour(res);
    })();
  }, []);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <TitleWithLine title='운영 시간 관리' titleFontType='h1' />
        <TimeLine>
          <LabelWithMultipleInput
            title='오픈 시간'
            type='number'
            pattern='\d*'
            values={[operationHour.openHour, operationHour.openMinute]}
            placeholders={['openHour', 'openMinute']}
            labelColor={theme.palette.white}
            inputBackgroundColor={theme.palette.gray50}
            inputColor={theme.colors.text.dark}
            maxLength={2}
            handleChangeInput={handleChangeMultipleInput}
          />
          <LabelWithMultipleInput
            title='닫는 시간'
            type='number'
            pattern='\d*'
            values={[operationHour.closeHour, operationHour.closeMinute]}
            placeholders={['closeHour', 'closeMinute']}
            labelColor={theme.palette.white}
            inputBackgroundColor={theme.palette.gray50}
            inputColor={theme.colors.text.dark}
            maxLength={2}
            handleChangeInput={handleChangeMultipleInput}
          />
          <Button
            style={{ padding: 12 }}
            hierarchy={ButtonHierarchy.Danger}
            onClick={handleClickChangeButton}
          >
            <Typography type='h4' textAlign='center'>
              변경하기
            </Typography>
          </Button>
        </TimeLine>
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  margin: 80px 120px 0 420px;
`;

const TimeLine = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default ManageTimePage;
