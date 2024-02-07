import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    no_telpon: "",
    password: "",
    confirm_password: "",
    alamat: "",
    foto_user: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "foto_user") {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const { password, confirm_password } = formData;
    if (e.target.name === "confirm_password" && password !== e.target.value) {
      setPasswordError("Password tidak cocok");
    } else {
      setPasswordError("");
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Sedang menyimpan data...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("no_telpon", formData.no_telpon);
      formDataObj.append("password", formData.password);
      formDataObj.append("confirm_password", formData.confirm_password);
      formDataObj.append("alamat", formData.alamat);
      formDataObj.append("foto_user", selectedImage);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Register!",
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan dalam melakukan register!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Register</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={formData.name}
                          className="form-control"
                          placeholder="Nama"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          value={formData.username}
                          className="form-control"
                          placeholder="Username"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          className="form-control"
                          placeholder="Alamat Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          name="no_telpon"
                          onChange={handleChange}
                          value={formData.no_telpon}
                          className="form-control"
                          placeholder="Nomor Telepon"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handlePasswordChange}
                          value={formData.password}
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="confirm_password"
                          onChange={handlePasswordChange}
                          value={formData.confirm_password}
                          className="form-control"
                          placeholder="Ulangi Password"
                          required
                        />
                        {passwordError && (
                          <span className="text-danger">{passwordError}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="alamat"
                          onChange={handleChange}
                          value={formData.alamat}
                          className="form-control"
                          placeholder="Alamat"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-white">Foto User</label>
                        <input
                          type="file"
                          name="foto_user"
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-dark btn-user btn-block"
                      >
                        Register
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link to="/login" className="small text-dark">
                        Sudah punya akun? Login di sini!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register