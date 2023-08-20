import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ButtonSheetCloseICon } from '@/icons/icon';
import ImageLoading from '@/components/common/ImageLoading';

const StoreInfoWindowMobile = ({ store, zoonolStoreInfo, closeInfoWindow }) => {
  const { name, address, additionalInfo, homepage, zoonolFeedUrl, thumbnail } =
    store;
  const {
    isZoonolPlace,
    convertedInfoUpdatedAt,
    largeDogAvailableMessage,
    entranceCondition,
    category,
  } = zoonolStoreInfo;

  const TOP_MAX = (-1 * window.innerHeight) / 2 + 80;
  const BOTTOM_MIN = window.innerHeight / 2 - 80;

  const [y, setY] = useState(0);

  return (
    <Wrapper
      animate={{ y }}
      drag="y"
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{
        top: TOP_MAX,
        bottom: BOTTOM_MIN,
      }}
      onDragEnd={(_, info) => {
        const deltaY = info.delta.y;
        if (deltaY > 0) {
          setY(0);
        } else {
          setY(TOP_MAX);
        }
      }}
    >
      <Header>
        <TopBar />
        <CloseIconWrapper onClick={closeInfoWindow}>
          <ButtonSheetCloseICon />
        </CloseIconWrapper>
      </Header>
      <InnerWrapper>
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
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 70%;
  right: 0;
  background-color: #ffffff;
  width: 100%;
  height: 200%;
  z-index: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  padding: 20px;
`;

const TopBar = styled.div`
  height: 6px;
  width: 80px;
  background-color: #cbcbcb;
  margin-top: 12px;
  border-radius: 4px;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
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

export default StoreInfoWindowMobile;
