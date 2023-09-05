import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [items, setItems] = useState(() => {
    const listItems = JSON.parse(localStorage.getItem("items")) || [];
    return listItems;
  });

  const [item, setItem] = useState("");
  const itemRef = useRef();
  const [nameEdit, setNameEdit] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      status: false,
      nameItem: item,
      isEdit: false,
    };
    const newItems = [...items, newItem];
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(newItems);
    setItem("");
    itemRef.current.focus();
  };

  const handleCheck = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });

    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const newItem = items.filter((item) => item.id !== id);
    localStorage.setItem("items", JSON.stringify(newItem));
    setItems(newItem);
    itemRef.current.focus();
  };

  const handleShowEdit = (item) => {
    setNameEdit(item.nameItem);
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === item.id) {
          return { ...item, isEdit: true };
        }
        return item;
      });
    });
  };

  const handleCancel = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, isEdit: false };
        }
        return item;
      });
    });
  };

  const handleChaneInput = (e) => {
    const { value } = e.target;
    setNameEdit(value);
  };

  const handleSave = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, nameItem: nameEdit, isEdit: false };
      }
      return item;
    });

    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  return (
    <>
      <div className="card" style={{ backgroundColor: " rgb(214, 90, 111)" }}>
        <div className="card-body p-1">
          <h3 style={{ textAlign: "left" }}>To Do List</h3>
          <h6 style={{ textAlign: "left" }}>
            Get things done, one item at a time
          </h6>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <ul className="list-group mb-0">
                {items.map((item) => (
                  <>
                    {item.isEdit ? (
                      <>
                        <li
                          key={item.id}
                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                          style={{ backgroundColor: "#f4f6f7" }}
                        >
                          <div>
                            <input
                              value={nameEdit}
                              onChange={handleChaneInput}
                              name="nameEdit"
                              className="form-control "
                              type="text"
                              style={{ width: "500px" }}
                            />
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleSave(item.id)}
                              className="btn btn-info ms-2"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleCancel(item.id)}
                              className="btn btn-danger"
                            >
                              Close
                            </button>
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          key={item.id}
                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                          style={{ backgroundColor: "#f4f6f7" }}
                        >
                          <div>
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              checked={item.status === true}
                              onChange={() => handleCheck(item.id)}
                            />
                            {item.status ? (
                              <>
                                <s>{item.nameItem}</s>
                              </>
                            ) : (
                              <>
                                <span>{item.nameItem}</span>
                              </>
                            )}
                          </div>
                          <div>
                            <a
                              onClick={() => handleShowEdit(item)}
                              className="text-alert"
                              title="Edit Item"
                            >
                              <i className="fas fa-pencil-alt me-3" />
                            </a>
                            <a
                              onClick={() => handleDelete(item.id)}
                              className="text-danger"
                              title="Delete Item"
                            >
                              <i className="fas fa-trash-alt" />
                            </a>
                          </div>
                        </li>
                      </>
                    )}
                  </>
                ))}
              </ul>
            </div>
            <ul className="nav nav-tabs  " id="ex1" role="tablist">
              <li
                className="nav-item"
                role="presentation"
                style={{ display: "flex", gap: "10px" }}
              >
                <span className=" ">Move done items at the end?</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <form
          onSubmit={handleAdd}
          className="d-flex justify-content-center align-items-center "
        >
          <div className="flex-fill">
            <input
              ref={itemRef}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success ms-2">
            ADD ITEM
          </button>
        </form>
      </div>
    </>
  );
}
