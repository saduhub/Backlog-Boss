// import { useState, useMutation } from 'react';
// import { REQUEST_FRIEND } from '../utils/mutations';

// import searchIcon from '../assets/images/png/icons8-search-white.png';

// const FriendSearch = ({ friendRequests }) => {
//   const [ friend, setFriend ] = useState('');
//   //// useState for result will have to start empty in development
//   const [ result , setResult ] = useState({});

//   const handleFriendInput = () => {
//     setFriend(document.querySelector('#friendSearch').value);
//   }

//   const handleFriendSearch = () => {
//     //// Query database to look for users with name equal to friend
//     setResult(friend);
//     setFriend('');
//   }

//   const handleFriendRequest = () => {
//     const { data } = useMutation(REQUEST_FRIEND, {
//       variables: {
//         friendRequests: 
//       }
//     })
//   }

//   return (
//     <div>
//       <div className="social-flex social-content-center social-my-p5">
//         <div className="social-search-box social-inner-box social-flex social-border-radius">
//           <input type="text" onChange={handleFriendInput} id="friendSearch" value={friend} className="social-search-input social-border-radius social-font" />
//           <button onSubmit={handleFriendSearch} className="social-search-button social-border-radius social-font">
//             <img src={searchIcon} alt="search icon" className="social-search-icon" />
//           </button>
//         </div>
//       </div>

//       <section>
//       {result &&
//         <div className="social-sub-container social-mx-auto">
//           <div className="social-flex social-flex-wrap social-inner-box social-content-between social-border-radius">
//             <div className="social-flex social-items-center">
//               <img src={friendRequests[0].profilePictureUrl} alt="profile pic" className="social-profile-pic social-border-radius" />
//               <p className="social-font">{friendRequests[0].username}</p>
//             </div>
//             <button onClick={handleFriendRequest} className="social-button social-border-radius social-font">
//               Add Friend
//             </button>
//           </div>
//         </div>
//       }
//       </section>
//     </div>
//   )
// }

// export default FriendSearch