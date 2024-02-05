export const errorHandler = (error) => {
  if (error.code === 'ERR_INVALID_ARG_TYPE') {
    console.log(error)
    console.error(`Invalid input`);
  } else {
    console.error(`Operation failed. \n ${error}`);
  }
};
