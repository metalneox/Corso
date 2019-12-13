module.exports.sum = (event, context, callback) => {
    const postedParameters = JSON.parse(event.body)
    console.log(postedParameters.a)
    console.log(postedParameters.b)

    const result = parseInt(postedParameters.a) + parseInt(postedParameters.b)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
          somma: result,
        }),
      };
    
      callback(null, response);
}