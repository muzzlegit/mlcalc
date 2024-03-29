import styled from "@emotion/styled";

export const TowerBox = styled.div({
  display: "flex",
  justifyContent: "start",
  alignItems: "flex-start",
  gap: "8px",
});
export const TowerImgBox = styled.div(
  {
    width: "34px",
    height: "41px",
    borderRadius: "4px",
    backgroundColor: "grey",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 4px 4px rgba(255,0,0,.4)",
      backgroundColor: "#4a5153",
    },
  },
  props => ({
    background: props.background,
  }),
);
export const ImgWrap = styled.div({
  position: "relative",
});
export const LevelLabel = styled.div(
  {
    position: "absolute",
    top: "0",
    right: "0",
    transform: "translate(0, -50%)",
    width: "13px",
    height: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontSize: "10px",
    color: "white",
    backgroundColor: "#212425",
  },
  props => ({
    border: props.border === 8 ? null : "1px solid #FFFFFF",
    background: props.background,
  }),
);
export const Quantity = styled.p(
  {
    position: "absolute",
    bottom: "-10px",
    right: "0",
    width: "33px",
    height: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "340%",
    fontSize: "10px",
    color: "white",
    backgroundColor: "#212425",
  },
  props => ({
    border: props.border === 8 ? null : "1px solid #FFFFFF",
    background: props.background,
  }),
);
