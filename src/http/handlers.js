const Joi = require('joi');
const validator = require('express-joi-validator');

const NUMBER = Joi.number();
const STRING = Joi.string();
// const DATE = Joi.date();

const postMethodSchema = {
  ADD_PRODUCT: {
    params: {
      id: NUMBER.required()
    },
    body: {
      name: STRING.required(),
      img: STRING,
      price: NUMBER.required()
    }
  },
  ADD_TRX: {
    body: {
      store_id: NUMBER.required(),
      user_id: NUMBER.required(),
      product_ids: Joi.array().items(NUMBER).required()
    }
  },
  ADD_REVIEW: {
    params: {
      id: NUMBER.required()
    },
    body: {
      review: STRING.required(),
      rating: NUMBER.required()
    }
  }
};

const getMethodSchema = {
  GET_BY_ID: {
    params: {
      id: NUMBER.required()
    }
  }
};

const putMethodSchema = {
  UPDATE_PRODUCT: {
    params: {
      id: NUMBER.required()
    },
    body: {
      product_id: NUMBER.required(),
      name: STRING,
      img_url: STRING,
      price: STRING
    }
  },
  UPDATE_TRX_NOTES: {
    params: {
      id: NUMBER.required()
    },
    body: {
      notes: STRING,
      updated_by: NUMBER.required() // 1 USER, 2 STORE
    }
  },
  UPDATE_TRX_STATUS: {
    params: {
      id: NUMBER.required()
    },
    body: {
      status: STRING.required()
    }
  }
};

const schema = { ...postMethodSchema, ...getMethodSchema, ...putMethodSchema };

exports.validate = (endpoint) => validator(schema[endpoint]);
