const queryStringToObject = (qs) => {
  if (qs[0] === "?")
    qs = qs.slice(1)
  let obj = {}
  for (const keyValue of qs.split("&")) {
    const [key, value] = keyValue.split("=")
    if (key && value)
      obj[key] = value
  }
  return obj
}

export default queryStringToObject