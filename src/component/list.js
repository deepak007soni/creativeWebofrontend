import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const axios = require("axios").default;

const List = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [state, setState] = useState([]);
  useEffect(() => {
    getPage();
  }, []);

  function getPage() {
    const my = new URL("http://localhost:8000/interview/list/getAll");
    axios({
      method: "get",
      url: my,
      responseType: "stream",
    })
      .then(function (response) {
        // handle success
        let data = response.data.data;
        console.log(response);
        setState(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function DeleteById(id) {
    const my = new URL(`http://localhost:8000/interview/delete/${id}`);
    axios({
      method: "GET",
      url: my,
      data: {},
      responseType: "stream",
    })
      .then(function (response) {
        let data = response.data.data;
        console.log(data);
        getPage();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="mainContent px-3 mt-4">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-sm-12">
            <div className="card border-0 shadow-sm rounded-3">
              {/* Card header */}
              <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
                <h2 className="left-widget col-5">List page</h2>
                <button
                  type="button"
                  class="btn btn-sm btn-primary my-1"
                  style={{ color: "blue" }}
                  onClick={() => navigate(`/add`)}
                >
                  Add
                </button>
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th className="text-right">Edit</th>
                      <th className="text-right">Delete</th>
                    </tr>
                  </thead>
                  {/* myComment */}
                  <tbody>
                    {state?.map((data) => {
                      return (
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-sm btn-primary my-1"
                              style={{ color: "black" }}
                              onClick={() => navigate(`/edit/${data._id}`)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger my-1"
                              style={{ color: "black" }}
                              onClick={() => DeleteById(data._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
