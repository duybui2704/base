function getFileName(file?: any) {
  if (file?.name !== undefined) {
    return file.name;
  }
  if (file?.filename !== undefined && file?.filename !== null) {
    return file?.filename;
  }
  const type = file?.mime || file?.type;
  return `${Math.floor(Math.random() * Math.floor(999999999))}.${type?.split('/')[1]}`;
}

export default {getFileName};
