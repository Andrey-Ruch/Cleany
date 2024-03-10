// react
import { useState } from "react";
import { Link, Form } from "react-router-dom";
// icons
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
// style
import Wrapper from "../assets/wrappers/CardMenuContainer";

const CardMenu = ({ route, id }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn btn-outline"
        onClick={() => setShowMenu(!showMenu)}
      >
        <BsThreeDotsVertical />
      </button>

      <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
        <Link to={`/dashboard/${route}/edit/${id}`} className="dropdown-btn">
          <MdEdit />
          Edit
        </Link>

        <Form method="post" action={`/dashboard/${route}/delete/${id}`}>
          <button type="submit" className="dropdown-btn danger-btn">
            <MdDeleteForever />
            Delete
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default CardMenu;
