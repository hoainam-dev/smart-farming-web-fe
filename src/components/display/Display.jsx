import React, { useState, useEffect } from "react";
import "./display.css";
function Display(props) {
  const [distanceAndFlame, setdistanceAndFlame] = useState(0);
  const [statusFlame, setstatusFlame] = useState(false);

  console.log(props.status, "STATUS");
  useEffect(() => {
    setdistanceAndFlame(props.type);
  }, [props.type]);

  useEffect(() => {
    setstatusFlame(props.status);
  }, [props.status]);
  return (
    <>
      {statusFlame ? (
        <div className="modal__container">
          <img
            src="https://banner2.cleanpng.com/20180317/gfe/kisspng-computer-icons-fire-flame-clip-art-cartoon-fire-images-5aad899fc6d685.3330822615213223998145.jpg"
            alt=""
          />
          <h2>Nguy Hiểm</h2>
        </div>
      ) : (
        ""
      )}
      <div className="display">
        <div className="display-value">{distanceAndFlame}</div>
      </div>
    </>
  );
}

export default Display;