import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Dinner } from '../@types';
import { DinnerService } from '../api';
import {
  ClickableDinnerCard,
  PageNavigation,
  SideMenuList,
  TitleWithLine,
  Typography,
} from '../components';
import usePagination from '../hooks/usePagination';
import { dinnerNameState } from '../stores';
import { theme } from '../styles';

function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dinnerNameList = useRecoilValue(dinnerNameState);
  const [transcript, setTranscript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dinnerList, setDinnerList] = useState<Dinner[]>([]);
  const topContainer = useRef<HTMLDivElement>(null);
  const page = searchParams.get('page') || 0;
  const size = searchParams.get('size') || 10;
  const { pageOptions, handleChangePage } = usePagination({
    totalCount,
  });

  useEffect(() => {
    // 디너 정보 페이지별로 가져오기
    (async () => {
      setIsLoading(true);
      const res = await DinnerService.getDinnerList({ page: Number(page) - 1, size: Number(size) });
      setTotalCount(res.totalElements);
      setDinnerList(res.content);
      setIsLoading(false);
    })();
  }, [page, size]);

  useEffect(() => {
    // 디너 정보가 바뀌면 스크롤은 최상단
    topContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [dinnerList]);

  useEffect(() => {
    const dinnerIndex = dinnerNameList.findIndex((dinner) => dinner.name === transcript);
    if (dinnerIndex === -1 && transcript !== '') {
      // 찾지 못했을 때
      alert('해당 디너가 없습니다.');
      setTranscript('');
    } else if (dinnerIndex > 0) {
      console.log(dinnerNameList[dinnerIndex]);
      alert('해당 디너 페이지로 넘어갑니다.');
      navigate(`/item/${dinnerNameList[dinnerIndex].id}`);
    }
  }, [dinnerNameList, navigate, transcript]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        {isLoading ? (
          <LoadingContainer>
            <LoadingGIF src='/loading.gif' alt='loading-component' />
          </LoadingContainer>
        ) : (
          <>
            <div ref={topContainer} />

            <TranscriptLine>
              {transcript !== '' && (
                <Transcript type='h3' textAlign='end'>
                  음성: {transcript}
                </Transcript>
              )}
            </TranscriptLine>
            <TitleWithLine
              type='mic-icon'
              title='메뉴'
              titleFontType='h1'
              titleColor={theme.colors.text.bold}
              borderColor={theme.palette.gray50}
              setValue={setTranscript}
            />
            <DinnerList>
              {dinnerList?.map((dinner) => (
                <ClickableDinnerCard
                  key={dinner.dinnerId}
                  title={dinner.dinnerName}
                  src={dinner.dinnerImage || '/Dinner.png'}
                  href={`/item/${dinner.dinnerId}`}
                />
              ))}
            </DinnerList>
            <PageNavigation pageOptions={pageOptions} handleChangePage={handleChangePage} />
          </>
        )}
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  padding: 120px 104px 120px 424px;
`;

const DinnerList = styled.section`
  width: 100%;
  height: 100%;
  margin-block: 72px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 80px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LoadingGIF = styled.img`
  max-width: 50%;
  height: 100%;
`;

const TranscriptLine = styled.section`
  width: 100%;
  min-height: 50px;
`;

const Transcript = styled(Typography)`
  width: 100%;
`;

export default MainPage;
