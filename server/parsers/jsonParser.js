
function jsonParser(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    const parsedReq = { ...req };
  
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
  
    req.on("end", () => {
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
        parsedReq.body = parsedBody;
        resolve(parsedReq);
      } catch (err) {
        reject(new Error("Invalid request"));
      }
    });
  });
};

exports.jsonParser = jsonParser;
