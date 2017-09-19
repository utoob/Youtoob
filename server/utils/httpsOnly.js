const httpsOnly = (req, res, next) => {
  if (req.headers["x-forwarded-proto"] == "http") {
    res.redirect("https://" + req.url, next);
  } else {
    return next();
  } 
}

export default httpsOnly