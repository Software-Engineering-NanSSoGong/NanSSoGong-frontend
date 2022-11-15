import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { isAuth } from '../stores';
import { Address, Card } from '../@types';
import { STRING_MAX_LENGTH } from '../components/LabelWithMultipleInput';
import { signUpState as RecoilSignUpState } from '../stores/SignUp';
import { Button, LabelWithMultipleInput, TitleWithLine, Typography } from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { theme } from '../styles';
import { ClientService } from '../api';

function ProfilePage() {
  const navigate = useNavigate();
  const signUpState = useRecoilValue(RecoilSignUpState);
  const [address, setAddress] = React.useState<Address>({ city: '', street: '', zipcode: '' });
  const [cardNumber, setCardNumber] = React.useState<Card>({
    card1: null,
    card2: null,
    card3: null,
    card4: null,
  });
  const [accept, setAccept] = React.useState<boolean>(false);

  const handleChangeMultipleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, name, value } = e.currentTarget;
    if (maxLength !== STRING_MAX_LENGTH) {
      setCardNumber((prev) => ({ ...prev, [name]: value.slice(0, maxLength) }));
    } else {
      setAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleClickButton = () => {
  //   console.log(address);
  //   navigate('/main');
  // };

  const handleClickButton = async () => {
    const concatCardNumber = `${cardNumber.card1}${cardNumber.card2}${cardNumber.card3}${cardNumber.card4}`;
    try {
      const res = await ClientService.signUp({
        ...signUpState,
        personalInformationCollectionAgreement: accept,
        address,
        cardNumber: concatCardNumber,
      });
      if (res?.id) {
        navigate('/main');
        alert('회원가입이 완료되었습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <SignupBoxLayout>
        <BoxLayout>
          <Title
            title='내 정보 수정'
            titleFontType='h1'
            textAlign='center'
            titleColor={theme.colors.text.dark}
            borderColor={theme.palette.black}
          />
          <Lines>
            <LabelWithMultipleInput
              title='카드 번호'
              type='number'
              pattern='\d*'
              values={[cardNumber.card1, cardNumber.card2, cardNumber.card3, cardNumber.card4]}
              placeholders={['card1', 'card2', 'card3', 'card4']}
              labelColor={theme.colors.background}
              inputBackgroundColor={theme.palette.gray200}
              inputColor={theme.colors.text.bold}
              maxLength={4}
              handleChangeInput={handleChangeMultipleInput}
            />
            <LabelWithMultipleInput
              title='상세 주소'
              type='text'
              values={[address.city, address.street, address.zipcode]}
              placeholders={['city', 'street', 'zipcode']}
              labelColor={theme.colors.background}
              inputBackgroundColor={theme.palette.gray200}
              inputColor={theme.colors.text.bold}
              handleChangeInput={handleChangeMultipleInput}
            />

            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              개인정보 이용 동의
            </Typography>
            <AcceptButton
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => setAccept((prev) => !prev)}
              hierarchy={ButtonHierarchy.DarkGray}
              className={accept === true ? 'active' : ''}
            >
              <Typography type='h4' color={theme.palette.white} textAlign='center'>
                동의합니다
              </Typography>
            </AcceptButton>
          </Lines>

          <Lines>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={handleClickButton}
              // disabled={nickname === ''}
            >
              <Typography type='h4' color={theme.palette.gray50} textAlign='center'>
                수정하기
              </Typography>
            </Button>
          </Lines>
          <LogoImg src='/logo.png' alt='mr-daebak logo' />
        </BoxLayout>
      </SignupBoxLayout>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupBoxLayout = styled.section`
  width: 50%;
  margin-block: 120px;
  background-color: ${theme.palette.gray50};
  border-radius: 16px;
`;
const BoxLayout = styled.div`
  margin-inline: 72px;
`;
const Title = styled(TitleWithLine)`
  padding-top: 56px;
`;

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

const Lines = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AcceptButton = styled(Button)`
  padding: 20px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${theme.palette.gray400};
  }

  &.active {
    background-color: ${theme.colors.primary.green};
  }
`;

export default ProfilePage;
