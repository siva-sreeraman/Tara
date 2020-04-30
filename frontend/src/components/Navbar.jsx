// import React from "react";
// import { Link } from "react-router-dom";

// import * as firebase from "firebase/app";

// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//     };
//   }

//   componentDidMount() {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;
//         console.log(JSON.stringify(user));
//         this.setState({ user: user });
//         // ...
//       } else {
//         // User is signed out.
//         // ...
//         console.log("onAuthStateChanged - Signed Out");
//       }
//     });
//   }

//   handleLogout() {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         // Sign-out successful.
//         this.setState({ user: null });
//         console.log("handleLogout: Sign-out successful!");
//       })
//       .catch((error) => {
//         // An error happened.
//         console.log("handleLogout: error: " + error);
//       });
//   }

//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light">
//           <Link className="navbar-brand" to="/">
//             TARA
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarNavAltMarkup"
//             aria-controls="navbarNavAltMarkup"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//             <div className="navbar-nav w-100">
//               <Link className="nav-item nav-link" to="/calendar">
//                 Calendar
//               </Link>
//               <Link className="nav-item nav-link" to="/my-projects">
//                 Projects
//               </Link>

//               <Link className="nav-item nav-link" to="/">
//                 {" "}
//                 Tasks
//               </Link>
//               <Link className="nav-item nav-link" to="/su-dashboard">
//                 SU
//               </Link>
//               <Link className="nav-item nav-link" to="/admin-dashboard">
//                 Admin
//               </Link>
//               <Link className="nav-item nav-link" to="/company-db">
//                 Company Data Base
//               </Link>
//               <Link className="nav-item nav-link" to="/mycalender">
//                  Mycalender
//               </Link>
//             </div>
//           </div>
//           {!!this.state?.auth?.uid ? (
//             <button
//               className="pull-right btn btn-sm btn-outline-primary"
//               onClick={this.handleLogout}
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               className="pull-right btn btn-sm btn btn-outline-dark"
//               to="/login"
//             >
//               Login
//             </Link>
//           )}
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;
