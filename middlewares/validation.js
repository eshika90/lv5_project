const validator = require('express-validator');
const { body, validationResult } = validator;

const validate = function (req, res, next) {
  const errors = validationResult(req);
  // 에러 변수에 결과값이 없다면 다음으로 넘어감
  if (errors.isEmpty()) {
    next();
  }
  // 에러 변수에 결과값이 있다면 errors배열을 순회하며 출력
  else {
    res
      .status(400)
      .json({ errorMessage: errors.array().map((v, idx) => `${v.msg}`) });
  }
};

// 라우터 유효성 검사
const defaultValidate = {
  createUser: [
    body('nickname').trim().notEmpty().withMessage('닉네임을 입력해주세요.'),
    body('password')
      .custom((value, { req }) => {
        if (value != req.body.confirm) {
          throw new Error('확인 비밀번호와 일치하지 않습니다.');
        } else {
          return value;
        }
      })
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,8}$/)
      .withMessage('숫자와 문자를 포함한 4~8자리 비밀번호를 입력해주세요.'),
    validate,
  ],
  login: [
    body('nickname').trim().notEmpty().withMessage('닉네임을 입력해주세요.'),
    body('password').trim().notEmpty().withMessage('패스워드를 입력해주세요'),
    validate,
  ],
  createPost: [
    body('title').trim().notEmpty().withMessage('내용을 입력해주세요'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('내용을 입력해주세요.')
      .isLength({ min: 10 })
      .withMessage('10자 이상을 입력하셔야 합니다.'),
    validate,
  ],
  updatePost: [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('내용을 입력해주세요.')
      .isLength({ min: 10 })
      .withMessage('10자 이상을 입력하셔야 합니다.'),
    validate,
  ],
  createComment: [
    body('comment')
      .trim()
      .isLength({ min: 3 })
      .withMessage('댓글은 최소 3글자 이상 작성 부탁드립니다.'),
    validate,
  ],
  updateComment: [
    body('comment')
      .trim()
      .isLength({ min: 3 })
      .withMessage('댓글은 최소 3글자 이상 작성 부탁드립니다.'),
    validate,
  ],
};

module.exports = defaultValidate;
