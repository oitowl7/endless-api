const stepPostValidator = async (body, query) => {
  if(!body.stepWeight)
    return {valid: false, error: "No stepWeight", code: 400};

  if(typeof body.stepWeight !== 'number')
    return {valid: false, error: "Step weight needs to be a number.", code: 400};

  if(!body.initialVersion)
    return {valid: false, error: "Initial version is required as object including title and body parameters.", code: 400};  

  if(!body.initialVersion.title)
    return {valid: false, error: "Title must be included in inital version", code: 400};

  if(!body.initialVersion.body)
    return {valid: false, error: "Body must be included in inital version", code: 400};

  stepWeightCheck = await query(`SELECT * FROM steps WHERE stepWeight = ${body.stepWeight}`);

  if(stepWeightCheck[0])
    return {valid: false, error: "Step weight already taken", code: 400};
    

  return {valid: true, error: null};
}

const stepVersionPostValidator = async (body, query, id) => {
  const stepIdCheck = await query(`SELECT * FROM steps WHERE id = ${id}`);

  if(!stepIdCheck[0])
    return {valid: false, error: "No step found with passed id", code: 404};
  
  if(!body.title)
    return {valid: false, error: "Title must be included", code: 400};

  if(!body.body)
    return {valid: false, error: "Body must be included", code: 400};
    

  return {valid: true, error: null};
}

const stepPutValidator = async (body, query, id) => {
  if(!body.stepWeight)
    return {valid: false, error: "No stepWeight", code: 400};

  const stepIdCheck = await query(`SELECT * FROM steps WHERE id = ${id}`);

  if(!stepIdCheck[0])
    return {valid: false, error: "No step found with passed id", code: 404};

  const stepWeightCheck = await query(`SELECT * FROM steps WHERE stepWeight = ${body.stepWeight}`);

  if(stepWeightCheck[0])
    return {valid: false, error: "Step weight already taken", code: 400};

  if(typeof body.stepWeight !== 'number')
    return {valid: false, error: "Step weight needs to be a number.", code: 400};

  return {valid: true, error: null};
}

const stepDeleteValidator = async (body, query, id) => {
  const stepIdCheck = await query(`SELECT * FROM steps WHERE id = ${id}`);

  if(!stepIdCheck[0])
    return {valid: false, error: "No step found with passed id", code: 404};

  return {valid: true, error: null};
}

exports.stepPostValidator = stepPostValidator;
exports.stepVersionPostValidator = stepVersionPostValidator;
exports.stepPutValidator = stepPutValidator;
exports.stepDeleteValidator = stepDeleteValidator;