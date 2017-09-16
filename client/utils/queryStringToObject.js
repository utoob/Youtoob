/********************** Steps to pass the FIRST test: **********************/
// 1. Write a function that would accept a queryString as the first parameter. (Done for you)
// 2. Initialize a variable `obj` that will hold an empty object.
// 3. Split the queryString using .split("&") and store it into a variable called keyValuePairs.
//      keyValuePairs would be a variable that holds 
//      an array containing key=value pairs e.g. ["a=1", "b=2"]
// 4. For each keyValue in keyValuePairs
//      var [key, value] = keyValue.split("=")
//      obj[key] = value
// 5. Return `obj`.


/********************** Steps to pass the SECOND test: **********************/
// 1. Check the first character in queryString is equal to `?`.
//      If it is, reassign queryString to itself without the `?`. 
//      queryString = queryString.slice(1)


/******************** Steps to pass the REMAINING test: ********************/
// 1. Only assign obj[key] = value if (key !== "") AND (value !== "").

function queryStringToObject(queryString) {
  if (queryString[0] === "?")
    queryString = queryString.slice(1)
  let obj = {}
  for (const keyValue of queryString.split("&")) {
    const [key, value] = keyValue.split("=")
    if (key && value)
      obj[key] = value
  }
  return obj  
}

export default queryStringToObject
