// A stored photo is either a full address (Cloudinary) or a file name saved on the server (older uploads).
export const imageUrl=(photo)=>{
  if(!photo) return ''
  return /^https?:\/\//i.test(photo) ? photo : `${process.env.REACT_APP_BASE_URL}/uploads/${photo}`
}
