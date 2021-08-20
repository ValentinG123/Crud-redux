import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";
const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redireccion

  // Confirmar si desa eliminar
  const confirmarEliminarProducto = (id) => {
    ///preguntar al usuario

    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasarlo al action

        dispatch(borrarProductoAction(id));
      }
    });
  };

  // Funcion que redigire de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weigth-bold"> $ {precio}</span>
      </td>
      <td className="acciones">
        <button
          className="btn btn-primary mr-2"
          type="button"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
