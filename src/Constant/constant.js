export const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const isImage = (file) => {
  if (file) {
    const fileName = file.name || file.path;
    const suffix = fileName.substr(fileName.indexOf(".") + 1).toLowerCase();
    if (
      suffix === "jpg" ||
      suffix === "jpeg" ||
      suffix === "bmp" ||
      suffix === "png"
    ) {
      return true;
    }
  }

  return false;
};
