import React, { useState, Fragment } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  RESTAURANT_CATEGORY_SEQ,
  CAFE_CATEGORY_SEQ,
  PUB_CATEGORY_SEQ,
} from '@/constants/constant';
import { ButtonSheetCloseIcon, CloseIcon } from '@/icons/icon';
import ImageLoading from '@/components/common/ImageLoading';

const StoreInfoWindow = ({ store, closeInfoWindow }) => {
  const controls = useAnimation();

  const { innerWidth } = window;
  const isMobile = innerWidth <= 768;

  const {
    name,
    address,
    thumbnail,
    additionalInfo,
    homepage,
    zoonolFeedUrl,
    categorySeq,
    offLeash,
    largeDogAvailable,
    zoonolPlace,
    needCage,
    infoUpdatedAt,
  } = store;

  const [y, setY] = useState(0);

  const isZoonolPlace = Boolean(zoonolPlace);
  const convertedInfoUpdatedAt = dayjs(infoUpdatedAt).format('YYYY년 M월 D일');
  const largeDogAvailableMessage = largeDogAvailable
    ? '대형견 입장 가능'
    : '대형견 입장 불가능';
  let entranceCondition = '';
  let category = '';

  if (needCage) {
    entranceCondition = '케이지 사용시 입장 가능';
  } else {
    if (offLeash) {
      entranceCondition = '리드줄 없이 입장 가능';
    } else {
      entranceCondition = '리드줄 착용시 입장 가능';
    }
  }

  switch (categorySeq) {
    case RESTAURANT_CATEGORY_SEQ:
      category = '식당';
      break;
    case CAFE_CATEGORY_SEQ:
      category = '카페';
      break;
    case PUB_CATEGORY_SEQ:
      category = '호프';
      break;
  }

  const handleDragEnd = (_, info) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start('hidden');
    } else {
      controls.start('visible');
    }
  };

  const StoreInfo = () => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };

  const InfoWindow = {
    Mobile() {
      return (
        <MobileWrapper
          drag="y"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { y: '10%' },
            hidden: { y: '60%' },
          }}
          dragElastic={0.1}
          dragMomentum={false}
          dragConstraints={{
            top: 0,
          }}
          onDragEnd={handleDragEnd}
        >
          <Header>
            <TopBar />
            <MobileCloseButton onClick={closeInfoWindow}>
              <ButtonSheetCloseIcon />
            </MobileCloseButton>
          </Header>
          <InnerWrapper>
            <StoreInfo />
          </InnerWrapper>
        </MobileWrapper>
      );
    },
    Desktop() {
      return (
        <DesktopWrapper>
          <DesktopCloseButton onClick={closeInfoWindow}>
            <CloseIcon />
          </DesktopCloseButton>
          <StoreInfo />
        </DesktopWrapper>
      );
    },
  };

  return isMobile ? <InfoWindow.Mobile /> : <InfoWindow.Desktop />;
};

const MobileWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  background-color: #ffffff;
  width: 100%;
  height: 900px;
  z-index: 2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`;

const DesktopWrapper = styled.div`
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

const MobileCloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const DesktopCloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
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

export default StoreInfoWindow;
