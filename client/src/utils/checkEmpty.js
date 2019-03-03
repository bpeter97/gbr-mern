const isEmpty = object => {
  console.log(object);
  for (var key in object) {
    if (object.hasOwnProperty(key)) return false;
  }

  return true;
};

export default isEmpty;
