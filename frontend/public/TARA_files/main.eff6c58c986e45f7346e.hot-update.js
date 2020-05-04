webpackHotUpdate("main",{

/***/ "./src/components/Login.jsx":
/*!**********************************!*\
  !*** ./src/components/Login.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _helpers_Env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/Env */ "./src/helpers/Env.js");
/* harmony import */ var _helpers_Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/Constants */ "./src/helpers/Constants.js");
/* harmony import */ var _assets_images_hollywood_jpeg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/images/hollywood.jpeg */ "./src/assets/images/hollywood.jpeg");
/* harmony import */ var _assets_images_hollywood_jpeg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_images_hollywood_jpeg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_css_login_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/css/login.css */ "./src/components/css/login.css");
/* harmony import */ var _components_css_login_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_components_css_login_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
var _jsxFileName = "/Users/bhavanaobellaneni/Desktop/Tara-272/frontend/src/components/Login.jsx";









 // Add the Firebase products that you want to use



class Login extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    this.submitForm = async () => {
      const loginData = {
        persona: this.state.persona
      };
      firebase_app__WEBPACK_IMPORTED_MODULE_9__["auth"]() // .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
        loginData.uid = res.user.uid;
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(`${_helpers_Env__WEBPACK_IMPORTED_MODULE_5__["default"].host}/auth/login`, loginData).then(loginResponse => {
          console.log("response::::", loginResponse.data);
          console.log("response::::", loginResponse.status);

          if (loginResponse.status == 200) {
            this.setState({
              loginFlag: true
            });
            window.sessionStorage.setItem("uid", loginResponse.data[0].uid);
            window.sessionStorage.setItem("name", loginResponse.data[0].name);
            window.sessionStorage.setItem("profile_pic", loginResponse.data[0].profile_pic);
            window.sessionStorage.setItem("companyId", loginResponse.data[0].company_id);
            window.sessionStorage.setItem("status", loginResponse.data[0].status);
            window.sessionStorage.setItem("companyId", loginResponse.data[0].company_id);
            window.sessionStorage.setItem("persona", this.state.persona); // {"uid":"6BPwpE5kYvM0WmztztpV4MEE54t2","name":"test3","profile_pic":null,"status":"2"}
          }
        });
        console.log("createUserWithEmailAndPassword res: " + JSON.stringify(res));
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message; // ...

        console.log("createUserWithEmailAndPassword error: " + JSON.stringify(error));
      });
    };

    this.state = {
      email: "",
      password: "",
      persona: "admin",
      loginFlag: false,
      invalidCredentialsMessage: "",
      redirectToReferrer: false,
      currentUser: null,
      loginFlag: false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    let redirectVar = null;

    if (this.state.loginFlag) {
      console.log("Register is:::", this.state.loginFlag);
      redirectVar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/my-projects",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 21
        }
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "bg-img",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 7
      }
    }, redirectVar, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "img",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        marginTop: "20px",
        paddingLeft: "900px"
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 7
      }
    }, redirectVar, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "card-body",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 15
      }
    }, !this.state.loginFlag ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 19
      }
    }, this.state.invalidCredentialsMessage) : "", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "student-profile-form",
      style: {
        paddingTop: "150px",
        width: "300px",
        paddingLeft: "50px"
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
      controlId: "exampleForm.ControlInput1",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 23
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      type: "email",
      placeholder: "Email",
      name: "email",
      onChange: this.handleOnChange,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 23
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
      controlId: "exampleForm.ControlInput1",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 23
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      type: "password",
      placeholder: "password",
      name: "password" // onKeyDown={this.onKeyUp}
      ,
      onChange: this.handleOnChange,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 23
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
      controlId: "exampleForm.ControlSelect1",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 23
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      as: "select",
      name: "persona",
      onChange: this.handleOnChange,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 23
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: _helpers_Constants__WEBPACK_IMPORTED_MODULE_6__["default"].Role.Admin,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 25
      }
    }, "Admin"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: _helpers_Constants__WEBPACK_IMPORTED_MODULE_6__["default"].Role.User,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 25
      }
    }, "User")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "nan",
      style: {
        paddingLeft: "80px",
        paddingTop: "10px"
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.submitForm,
      className: "button",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 19
      }
    }, "Login"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      className: "btn btn-outline-primary ml-3",
      to: "/sign-up",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 19
      }
    }, "Sign Up")))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ })

})
//# sourceMappingURL=main.eff6c58c986e45f7346e.hot-update.js.map