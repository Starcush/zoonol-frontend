function checkStoreDataType(key) {
  let dataType = 'text';
  switch (key) {
    case 'zoonolPlace':
    case 'naverStoreId':
    case 'categorySeq':
    case 'offLeash':
    case 'largeDogAvailable':
    case 'needCage':
      dataType = 'int';
      break;
    case 'name':
    case 'phoneNumber':
    case 'homepage':
    case 'shortAddress':
    case 'address':
    case 'roadAddress':
    case 'mapUrl':
    case 'thumbnail':
    case 'additionalInfo':
    case 'zoonolFeedUrl':
      dataType = 'char';
      break;
    case 'description':
    case 'convenience':
      dataType = 'text';
      break;
    case 'lat':
    case 'lng':
      dataType = 'double';
      break;
    // todo : infoUpdatedAt 삭제 예정
    // case 'infoUpdatedAt':
    //   dataType = 'date';
    //   break;
  }
  return dataType;
}

export { checkStoreDataType };
