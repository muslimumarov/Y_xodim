import { Layouts } from "layouts";
import { Login } from "pages";
import { useLoginStore } from "stores";

export const Private = ({ children }) => {
  const { isAuthenicated } = useLoginStore();
  if (isAuthenicated) return <Layouts>{children}</Layouts>;
  else return <Login />;
};




// import { Layouts } from "layouts";
// import { Login } from "pages";
// import { useLoginStore } from "stores";
// import PropTypes from 'prop-types'; // PropTypes kutubxonasini import qilamiz
//
// export const Private = ({ children }) => {
//   const { isAuthenicated } = useLoginStore();
//   if (isAuthenicated) return <Layouts>{children}</Layouts>;
//   else return <Login />;
// };
//
// Private.propTypes = {
//   children: PropTypes.node.isRequired, // children props'ini tekshiramiz
// };
