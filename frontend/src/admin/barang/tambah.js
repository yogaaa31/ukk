import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const BarangTambah = () => {    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_barang: '',
        keterangan: '',
    });
    const { authToken } = useAuth();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Sedang menyimpan data...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/barang', formData,
            {   
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                  },
                }
            );
            console.log(response.data);
            // Optionally, you can show a success message to the user using a library like SweetAlert2.
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil menambahkan data.',
                showConfirmButton: false,
            });

            setTimeout(() => {
                navigate('/admin/barang');
            }, 1000);
        } catch (error) {
            console.error('Error creating barang:', error.response.data);
            console.log(formData);
            // Optionally, you can show an error message to the user using a library like SweetAlert2.
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan dalam menambahkan data!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
        <div>
  <h1 className="h3 mb-3 text-gray-800">Tambah Barang</h1>
  {/* DataTales Example */}
  
  <div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-end align-items-center">
        <Link to="/admin/barang" className="btn btn-danger">
        <i className="bi bi-arrow-bar-left"></i>
            <span> Kembali</span>
        </Link>    
        <button
            type="button"
            className="btn btn-success ml-2"
            onClick={handleSubmit}
            disabled={loading}>
        <i className="bi bi-file-earmark-check"></i>
            <span> Simpan</span>
        </button>    
    </div>
    <div className="card-body">
      <form>
        <p className='fw-bold'>Nama Barang</p>                          
        <input type='text' name='nama_barang' onChange={handleChange} value={formData.nama_barang} className='form-control' required></input>
        <p className='fw-bold'>Keterangan</p>
        <input type='text' name='keterangan' onChange={handleChange} value={formData.keterangan} className='form-control' required></input>
      </form>
    </div>
  </div>
</div>
 
        </div>
    );
};

export default BarangTambah;
