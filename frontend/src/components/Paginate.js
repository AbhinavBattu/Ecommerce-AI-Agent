// import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import "./paginate.css";
// const Paginate = ({ filter, pages, page, isAdmin = false, keyword = "" }) => {
//   //only show the links if there is more than one page
//   return (
//     pages > 1 && (
//       <Pagination className="justify-content-center mt-3">
//         {/* make pages an array so we can map through it */}
//         {[...Array(pages).keys()].map((x) => (
//           <LinkContainer
//             key={x + 1}
//             to={
//               !isAdmin
//                 ? keyword
//                   ? `/products/search/${keyword}/page/${x + 1}/${filter}`
//                   : `/products/page/${x + 1}/${filter}`
//                 : `/admin/productlist/${x + 1}`
//             }
//           >
//             <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//           </LinkContainer>
//         ))}
//       </Pagination>
//     )
//   );
// };

// export default Paginate;

import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './paginate.css'; // Import your custom CSS

const Paginate = ({ filter, pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center custom-pagination">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/products/search/${keyword}/page/${x + 1}/${filter}`
                  : `/products/page/${x + 1}/${filter}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;

