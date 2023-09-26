function validateRequestMiddleware(DtoClass, withParams = false) {
    return function (req, res, next) {
      if (withParams) {
        req.body = Object.assign({}, req.body, req.params);
      }
  
      req.body = DtoClass.from(req.body);
  
      next();
    };
  }
  
  class ValidateRequestsMiddleware {
    constructor(DtoClass, options) {
      this.execute = this.execute.bind(this);
  
      this.DtoClass = DtoClass;
      this.options = options;
    }
  
    execute(req, res, next) {
      if (this.options.withParams) {
        req.body = Object.assign({}, req.body);
      }
  
      req.body = this.DtoClass.from(req.body);
  
      next();
    }
  
    static with(DtoClass, options = { withParams: false, withQuery: false }) {
      return new ValidateRequestsMiddleware(DtoClass, options).execute;
    }
  }
  
  module.exports = {
    validateRequestMiddleware,
    ValidateRequestsMiddleware,
  };
  