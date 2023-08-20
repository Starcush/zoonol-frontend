import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { CloseIcon } from '@/icons/icon';
import ImageLoading from '@/components/common/ImageLoading';

dayjs.locale('ko');

const StoreInfoWindowDesktop = ({
  store,
  zoonolStoreInfo,
  closeInfoWindow,
}) => {
  const { name, address, thumbnail, additionalInfo, homepage, zoonolFeedUrl } =
    store;
  const {
    isZoonolPlace,
    convertedInfoUpdatedAt,
    largeDogAvailableMessage,
    entranceCondition,
    category,
  } = zoonolStoreInfo;

  return (
    <Wrapper>
      <StoreInfoWrapper>
        <Name>{name}</Name>
        <Category>{category}</Category>
      </StoreInfoWrapper>
      {isZoonolPlace && (
        <ZoonolInfoWrapper>
          <ZoonolInfoRow>
            <ZoonolInfo primary>{largeDogAvailableMessage},</ZoonolInfo>
            <ZoonolInfo primary>{entranceCondition}</ZoonolInfo>
          </ZoonolInfoRow>
          <ZoonolInfoRow>
            <ZoonolInfo bold>{additionalInfo}</ZoonolInfo>
          </ZoonolInfoRow>
          <ZoonolInfoRow>
            <ZoonolInfo>
              <StoreLink href={homepage} target="_blank" rel="noreferrer">
                {`@${name}`}
              </StoreLink>
            </ZoonolInfo>
            {zoonolFeedUrl && (
              <ZoonolInfo>
                <StoreLink
                  href={zoonolFeedUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`@${name} in zooonol_`}
                </StoreLink>
              </ZoonolInfo>
            )}
          </ZoonolInfoRow>
        </ZoonolInfoWrapper>
      )}
      <StoreInfoWrapper>
        <Address>{address}</Address>
      </StoreInfoWrapper>
      {thumbnail && (
        <ThumbnailWrapper>
          <ImageLoading />
          <Thumbnail
            src={thumbnail}
            layout="fill"
            objectFit="cover" // todo 이거 곧 없어진다는데 수정해보자
            // width={400}
            // height={200}
            // blurDataURL={thumbnail}
            // placeholder="blur"
            alt={`${name}-thumbnail`}
          />
        </ThumbnailWrapper>
      )}
      {isZoonolPlace && (
        <InfoUpdateAtWrapper>
          <InfoUpdateAt>
            정보 업데이트 시기: {convertedInfoUpdatedAt}
          </InfoUpdateAt>
          <InfoUpdateAt small>
            * 정보가 변경됐다면{' '}
            <ZoonolInstagramLink
              href="https://www.instagram.com/zoonol_/"
              target="_blank"
              rel="noreferrer"
            >
              @zooonol_
            </ZoonolInstagramLink>
            로 연락주세요
          </InfoUpdateAt>
        </InfoUpdateAtWrapper>
      )}
      <CloseButton onClick={closeInfoWindow}>
        <CloseIcon />
      </CloseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 25px;
  left: 25px;
  width: 410px;
  z-index: 2;
`;

const StoreInfoWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
`;

const Name = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #191919;
  margin-right: 4px;
`;

const Category = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #777777;
  margin-right: 10px;
`;

const Address = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #777777;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  height: 200px;
  margin-top: 15px;
  user-select: none;
`;

const Thumbnail = styled(Image)`
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

const ZoonolInfoWrapper = styled.div`
  font-size: 14px;
  color: #000000;
`;

const ZoonolInfoRow = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const ZoonolInfo = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? 600 : 500)};
  font-size: ${({ primary }) => (primary ? '14px' : '12px')};
  color: ${({ primary }) => (primary ? '#278a29' : '#777777')};
  margin-right: 6px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const InfoUpdateAtWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const InfoUpdateAt = styled.div`
  font-size: ${({ small }) => (small ? '10px' : '12px')};
  color: #777777;
  margin-bottom: 2px;
`;

const InfoWindowLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: inherit;
  }
`;

const ZoonolInstagramLink = styled(InfoWindowLink)`
  font-weight: 600;
`;

const StoreLink = styled(InfoWindowLink)``;

export default StoreInfoWindowDesktop;
