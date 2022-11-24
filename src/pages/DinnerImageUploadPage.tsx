import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dinner } from '../@types';
import { DinnerService } from '../api';
import { Button, Typography } from '../components';

function DinnerImageUploadPage() {
  const params = useParams();
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [file, setFile] = useState<File>({} as File);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    (async () => {
      const dinnerItem = await DinnerService.getDinnerItem({ id: Number(params?.id) });
      setDinner(dinnerItem);
      setImgSrc(dinnerItem.dinnerImageAbsolutePath ?? '');
    })();
  }, [params?.id]);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLLabelElement & HTMLInputElement>) => {
    const files = e.target.files as FileList;
    setFile(files[0]);
  };

  const handleClickUploadButton = async () => {
    const formData = new FormData(); // formData 객체를 생성한다.

    formData.append('file', file);
    const res = await DinnerService.uploadDinnerImage({ id: dinner.dinnerId, file });
    setImgSrc(res);
    alert('이미지를 업로드했습니다.');
  };

  return (
    <Wrapper>
      <Spacer>
        <img src={imgSrc} style={{ maxWidth: '50%' }} />
        <Typography type='h3' textAlign='center'>
          {dinner.dinnerName}
        </Typography>
        <label htmlFor='file-upload' onChange={handleUploadFile}>
          <input id='file-upload' type='file' accept='.jpg,.jpeg,.png' />
        </label>
        <Button style={{ padding: 16 }} onClick={handleClickUploadButton}>
          업로드
        </Button>
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  padding: 120px;
  text-align: center;
`;

export default DinnerImageUploadPage;
