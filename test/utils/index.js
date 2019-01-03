export const checkObject = (obj, data) => {
  Object.keys(data).forEach((key) => {
    if (key !== 'id' && data[key]) obj[key].should.equal(data[key])
  })
}