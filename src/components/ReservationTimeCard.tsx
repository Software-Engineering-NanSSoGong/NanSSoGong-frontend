import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { theme } from '../styles';
import { Typography } from './common';
import LabelWithMultipleInput from './LabelWithMultipleInput';

function isSameYearMonthDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
}

interface Props {
  reservationTime: Date;
  onChangeTime: Dispatch<SetStateAction<Date>>;
  hourAndMinute: {
    hour: number;
    minute: number;
  };
  handleChangeHourTime: any;
}

function ReservationTimeCard({
  reservationTime,
  onChangeTime,
  hourAndMinute,
  handleChangeHourTime,
}: Props) {
  const onChange = (e: Date) => {
    const currentDate = new Date();
    const nextDate = new Date(e);
    if (!isSameYearMonthDay(currentDate, nextDate) && currentDate.getTime() > nextDate.getTime()) {
      alert('과거로는 주문할 수 없습니다.');
      return;
    }
    onChangeTime(nextDate);
  };

  return (
    <Wrapper>
      <BetweenLine>
        <Typography type='h4'>받을 날짜를 선택해 주세요</Typography>
        <Calendar value={reservationTime} onChange={onChange} />
      </BetweenLine>

      <LabelWithMultipleInput
        title='받을 시간'
        type='text'
        values={[hourAndMinute.hour, hourAndMinute.minute]}
        placeholders={['hour', 'minute']}
        labelColor={theme.palette.white}
        inputBackgroundColor={theme.palette.gray50}
        inputColor={theme.colors.text.dark}
        handleChangeInput={handleChangeHourTime}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BetweenLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ReservationTimeCard;
