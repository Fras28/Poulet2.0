import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import "./ModalConfirmar.css";
const API = process.env.REACT_APP_API_STRAPI;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEdit({ Child, txtBtn }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Estado para indicar si handleProducts está en proceso
  const { categorias, comercio } = useSelector((state) => state.alldata);
  const solo_ids = categorias?.map((cat) => cat.id) || [];


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width:"100%"}}>
      <div >
        <button onClick={handleClickOpen} disabled={loading}>
          {txtBtn ? txtBtn : "+ Proveedor"}
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{
          zIndex: 9999,
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
      >
        <DialogTitle className="infoNavi">
          <div>
            <img src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`} alt="logo Coqui Cakes" width="100px" />
          </div>
          <div style={{ marginLeft: "30%" }}>
            <button className="exit" onClick={handleClose}>
              x
            </button>
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: "scroll" }}>{Child}</DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
