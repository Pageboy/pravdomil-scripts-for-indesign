function versionString() {
  let date = new Date();
  return date.getFullYear().toString().substr(2)
    + date.getMonth().toString().padStart(2, "0")
    + date.getDate().toString().padStart(2, "0")
}
