export const IMAGE_FILE_VALIDATION = (file?: File) => {
  if (file === undefined) {
    alert("파일이 없습니다.")
    return false
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("파일을 5MB이하로 업로드해주세요.")
    return false
  }
  if (
    !file.type.includes("jpg") &&
    !file.type.includes("png") &&
    !file.type.includes("jpeg")
  ) {
    alert("jpg, jpeg, png만 업로드 가능")
    return false
  }

  return true
}
